import { customAlphabet } from "nanoid";
import { apiResponses } from "./spacetraders-schema";

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

  return apiResponses.register.parse(await response.json());
};

const authenticatedFetch = async (token: string, url: string) => {
  return fetch(url, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/json" },
  });
};

export const getAgent = async (token: string) => {
  console.log(`Fetching agent`);

  const response = await authenticatedFetch(token, MY_AGENT_DETAILS_URL);
  const data = await response.json();

  const myAgent = apiResponses.myAgent.parse(data);
  return myAgent.data;
};

export const getShips = async (token: string) => {
  console.log(`Fetching ships`);

  const response = await authenticatedFetch(token, `${BASE_URL}/v2/my/ships`);
  const myShips = apiResponses.myShips.parse(await response.json());
  return myShips.data;
};

export const getProfile = async (token: string) => {
  console.log(`Fetching profile`);

  const [agent] = await Promise.all([getAgent(token)]);

  return { agent };
};
