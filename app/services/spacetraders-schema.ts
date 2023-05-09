import z from "zod";
import { agentSchema } from "~/models/agentSchema";
import { contractSchema } from "~/models/contractSchema";
import { factionSchema } from "~/models/factionSchema";
import { metaSchema } from "~/models/metaSchema";
import { shipSchema } from "~/models/shipSchema";

export const tokenSchema = z.string();

export type Token = z.infer<typeof tokenSchema>;

const profileSchema = z.object({
  token: tokenSchema,
  agent: agentSchema,
  contract: contractSchema,
  faction: factionSchema,
  ship: shipSchema,
});

const response = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({ data: schema });

const responseWithMeta = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    data: schema,
    meta: metaSchema,
  });

export const apiSchema = {
  register: response(profileSchema),
  myAgent: response(agentSchema),
  myShips: responseWithMeta(z.array(shipSchema)),
} as const;
