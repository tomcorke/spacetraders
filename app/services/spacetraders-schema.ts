import z from "zod";

import { agentSchema } from "~/schema/agentSchema";
import { contractSchema } from "~/schema/contractSchema";
import { cooldownSchema } from "~/schema/cooldownSchema";
import { factionSchema } from "~/schema/factionSchema";
import { metaSchema } from "~/schema/metaSchema";
import { shipSchema } from "~/schema/shipSchema";
import { systemSchema } from "~/schema/systemSchema";

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
  myContracts: responseWithMeta(z.array(contractSchema)),
  listSystems: responseWithMeta(z.array(systemSchema)),
  shipScanSystems: response(
    z.object({ cooldown: cooldownSchema, systems: z.array(systemSchema) })
  ),
} as const;
