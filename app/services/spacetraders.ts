import z from "zod";
import { customAlphabet } from "nanoid";

export const tokenSchema = z.string();
export type Token = z.infer<typeof tokenSchema>;

export const agentSchema = z.object({
  accountId: z.string(),
  symbol: z.string(),
  headquarters: z.string(),
  credits: z.number(),
});
export type Agent = z.infer<typeof agentSchema>;

export const contractSchema = z.object({
  id: z.string(),
  factionSymbol: z.string(),
  type: z.string(),
  terms: z.unknown(),
  accepted: z.boolean(),
  fulfilled: z.boolean(),
  expiration: z.string(),
});
export type Contract = z.infer<typeof contractSchema>;

export const factionSchema = z.object({
  symbol: z.string(),
  name: z.string(),
  description: z.string(),
  headquarters: z.string(),
  traits: z.array(z.unknown()),
});
export type Faction = z.infer<typeof factionSchema>;

export const shipSchema = z.object({
  symbol: z.string(),
  nav: z.unknown(),
  crew: z.unknown(),
  fuel: z.unknown(),
  frame: z.unknown(),
  reactor: z.unknown(),
  engine: z.unknown(),
  modules: z.array(z.unknown()),
  mounts: z.array(z.unknown()),
  registration: z.unknown(),
  cargo: z.unknown(),
});
export type Ship = z.infer<typeof shipSchema>;

export const profileSchema = z.object({
  data: z.object({
    token: tokenSchema,
    agent: agentSchema,
    contract: contractSchema,
    faction: factionSchema,
    ship: shipSchema,
  }),
});
export type Profile = z.infer<typeof profileSchema>;

export enum FACTION {
  COSMIC = "COSMIC",
  VOID = "VOID",
  GALACTIC = "GALACTIC",
  QUANTUM = "QUANTUM",
  DOMINION = "DOMINION",
}

const registerParamsSchema = z.object({
  symbol: z.string(),
  faction: z.string(),
});

const BASE_URL = "https://api.spacetraders.io";
const REGISTER_URL = `${BASE_URL}/v2/register`;
const MY_AGENT_DETAILS_URL = `${BASE_URL}/v2/my/agent`;

type RegisterParams = { symbol: string; faction: FACTION };
export const register = async ({ symbol, faction }: RegisterParams) => {
  const uniqueSymbol = `${symbol}-${customAlphabet(
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
  const data = await response.json();

  return profileSchema.parse(data);
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

  return agentSchema.parse(data.data);
};

export const getProfile = async (token: string) => {
  console.log(`Fetching profile`);

  const [agent] = await Promise.all([getAgent(token)]);

  return { agent };
};
