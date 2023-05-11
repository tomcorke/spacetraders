import z from "zod";
import { shipTypeSchema } from "./shipTypeSchema";
import { shipyardTransactionSchema } from "./shipyardTransactionSchema";
import { shipyardShipSchema } from "./shipyardShipSchema";

export const shipyardSchema = z.object({
  // The symbol of the shipyard. The symbol is the same as the waypoint where the shipyard is located.
  symbol: z.string().min(1),
  // The list of ship types available for purchase at this shipyard.
  shipTypes: z.array(
    z.object({
      type: shipTypeSchema.optional(),
    })
  ),
  // The list of recent transactions at this shipyard.
  transactions: z.array(
    shipyardTransactionSchema
  ).optional(),
  // The ships that are currently available for purchase at the shipyard.
  ships: z.array(
    shipyardShipSchema
  ).optional(),
});

export type Shipyard = z.infer<typeof shipyardSchema>;
