import z from "zod";
import { shipNavRouteSchema } from "./shipNavRouteSchema";
import { shipNavStatusSchema } from "./shipNavStatusSchema";
import { shipNavFlightModeSchema } from "./shipNavFlightModeSchema";

export const shipNavSchema = z.object({
  systemSymbol: z.string(),
  waypointSymbol: z.string(),
  route: shipNavRouteSchema,
  status: shipNavStatusSchema,
  flightMode: shipNavFlightModeSchema
});

export type ShipNav = z.infer<typeof shipNavSchema>;
