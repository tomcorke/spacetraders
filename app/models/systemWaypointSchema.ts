import z from "zod";
import { waypointTypeSchema } from "./waypointTypeSchema";

export const systemWaypointSchema = z.object({
  symbol: z.string(),
  type: waypointTypeSchema,
  x: z.number(),
  y: z.number()
});

export type SystemWaypoint = z.infer<typeof systemWaypointSchema>;
