import z from "zod";
import { systemTypeSchema } from "./systemTypeSchema";

export const systemSchema = z.object({
  symbol: z.string(),
  sectorSymbol: z.string(),
  type: systemTypeSchema,
  x: z.number(),
  y: z.number(),
  waypoints: z.array(),
  factions: z.array()
});

export type System = z.infer<typeof systemSchema>;
