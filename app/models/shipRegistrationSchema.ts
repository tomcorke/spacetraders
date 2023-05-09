import z from "zod";
import { shipRoleSchema } from "./shipRoleSchema";

export const shipRegistrationSchema = z.object({
  name: z.string().min(1),
  factionSymbol: z.string().min(1),
  role: shipRoleSchema
});

export type ShipRegistration = z.infer<typeof shipRegistrationSchema>;
