import z from "zod";
import { shipRoleSchema } from "./shipRoleSchema";

export const shipRegistrationSchema = z.object({
  name: z.string(),
  factionSymbol: z.string(),
  role: shipRoleSchema
});

export type ShipRegistration = z.infer<typeof shipRegistrationSchema>;
