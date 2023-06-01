import { customAlphabet } from "nanoid";

import { apiSchema } from "./spacetraders-schema";
import { withRetry } from "./retry";

export enum FACTION {
  COSMIC = "COSMIC",
  VOID = "VOID",
  GALACTIC = "GALACTIC",
  QUANTUM = "QUANTUM",
  DOMINION = "DOMINION",
}

const BASE_URL = "https://api.spacetraders.io";
const REGISTER_URL = `${BASE_URL}/v2/register`;
const MY_AGENT_DETAILS_URL = `${BASE_URL}/v2/my/agent`;
const MY_SHIPS_URL = `${BASE_URL}/v2/my/ships`;
const MY_CONTRACTS_URL = `${BASE_URL}/v2/my/contracts`;
const LIST_SYSTEMS_URL = `${BASE_URL}/v2/systems`;

type RegisterParams = { symbol: string; faction: FACTION };
export const register = async ({ symbol, faction }: RegisterParams) => {
  const uniqueSymbol = `${symbol}_${customAlphabet(
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    4
  )()}`;
  console.log(`Registering ${uniqueSymbol} with ${faction}`);

  const response = await fetch(REGISTER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      symbol: uniqueSymbol,
      faction,
    }),
  });

  return apiSchema.register.parse(await response.json());
};

const authenticatedFetch = async (
  method: string,
  token: string,
  url: string,
  queryParams: Record<string, string | number> = {}
) => {
  const fullUrl = new URL(url);
  Object.entries(queryParams).forEach(([key, value]) =>
    fullUrl.searchParams.append(key, value.toString())
  );
  return fetch(fullUrl.href, {
    method,
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  });
};

const authenticatedGet = async (
  token: string,
  url: string,
  queryParams: Record<string, string | number> = {}
) => authenticatedFetch("GET", token, url, queryParams);

const authenticatedPost = async (
  token: string,
  url: string,
  queryParams: Record<string, string | number> = {}
) => authenticatedFetch("POST", token, url, queryParams);

export const myAgent = async (token: string) => {
  console.log(`Fetching agent`);

  const response = await authenticatedGet(token, MY_AGENT_DETAILS_URL);
  const data = await response.json();

  const myAgent = apiSchema.myAgent.parse(data);
  return myAgent.data;
};

export async function* listAllSystems(token: string) {
  console.log("Listing systems");

  let stop = false;
  const limit = 20;
  let page = 1;

  const getMoreSystems = () =>
    authenticatedGet(token, LIST_SYSTEMS_URL, { limit, page });

  while (!stop) {
    console.log("get more systems");
    const response = await withRetry(getMoreSystems, 3, (response) => {
      if (response.status === 429) {
        throw Error(`Rate limit error`);
      }
      return response.status === 200;
    });
    const data = await response.json();
    const systems = apiSchema.listSystems.parse(data);
    if (
      systems.meta.page * systems.meta.limit >= systems.meta.total ||
      page >= 3
    ) {
      stop = true;
    }
    page += 1;
    // Yield an page of systems
    yield systems.data;
  }
}

export const listSystems = async (token: string) => {
  console.log("Listing systems");

  const response = await authenticatedGet(token, LIST_SYSTEMS_URL);
  const data = await response.json();

  const systems = apiSchema.listSystems.parse(data);
  return systems.data;
};

export const shipScanSystems = async (token: string, shipSymbol: string) => {
  await authenticatedPost(token, `${BASE_URL}/v2/my/ships/${shipSymbol}/orbit`);
  const response = await authenticatedPost(
    token,
    `${BASE_URL}/v2/my/ships/${shipSymbol}/scan/systems`
  );
  const data = await response.json();

  const result = apiSchema.shipScanSystems.parse(data);
  return result.data;
};

export const myShips = async (token: string) => {
  console.log(`Fetching ships`);

  const response = await authenticatedGet(token, MY_SHIPS_URL);
  const myShips = apiSchema.myShips.parse(await response.json());

  myShips.data.forEach((ship) => {
    shipScanSystems(token, ship.symbol);
  });

  return myShips.data;
};

export const myContracts = async (token: string) => {
  console.log(`Fetching contracts`);

  const response = await authenticatedGet(token, MY_CONTRACTS_URL);
  const myContracts = apiSchema.myContracts.parse(await response.json());
  return myContracts.data;
};

export const getProfile = async (token: string) => {
  console.log(`Fetching profile`);

  const [agent] = await Promise.all([myAgent(token)]);

  return { agent };
};
