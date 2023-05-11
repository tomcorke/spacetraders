import z from "zod";
import { shipRoleSchema } from "./shipRoleSchema";

export const shipRegistrationSchema = z.object({
  // The agent's registered name of the ship
  name: z.string().min(1),
  // The symbol of the faction the ship is registered with
  factionSymbol: z.string().min(1).optional(),
  role: shipRoleSchema,
});

export type ShipRegistration = z.infer<typeof shipRegistrationSchema>;
