import z from "zod";

export const tokenSchema = z.string();

const agentSchema = z.object({
  accountId: z.string(),
  symbol: z.string(),
  headquarters: z.string(),
  credits: z.number(),
});
type Agent = z.infer<typeof agentSchema>;

const contractSchema = z.object({
  id: z.string(),
  factionSymbol: z.string(),
  type: z.string(),
  terms: z.unknown(),
  accepted: z.boolean(),
  fulfilled: z.boolean(),
  expiration: z.string(),
});
type Contract = z.infer<typeof contractSchema>;

const factionSchema = z.object({
  symbol: z.string(),
  name: z.string(),
  description: z.string(),
  headquarters: z.string(),
  traits: z.array(z.unknown()),
});
type Faction = z.infer<typeof factionSchema>;

const shipSchema = z.object({
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
type Ship = z.infer<typeof shipSchema>;

const metaSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
});
type Meta = z.infer<typeof metaSchema>;

const profileSchema = z.object({
  token: tokenSchema,
  agent: agentSchema,
  contract: contractSchema,
  faction: factionSchema,
  ship: shipSchema,
});
type Profile = z.infer<typeof profileSchema>;

enum FACTION {
  COSMIC = "COSMIC",
  VOID = "VOID",
  GALACTIC = "GALACTIC",
  QUANTUM = "QUANTUM",
  DOMINION = "DOMINION",
}

const response = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({ data: schema });

const responseWithMeta = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    data: schema,
    meta: metaSchema,
  });

export const apiResponses = {
  register: response(profileSchema),
  myAgent: response(agentSchema),
  myShips: responseWithMeta(z.array(shipSchema)),
} as const;
