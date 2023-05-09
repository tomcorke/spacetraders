import z from "zod";
import { systemTypeSchema } from "./systemTypeSchema";

export const connectedSystemSchema = z.object({
  symbol: z.string(),
  sectorSymbol: z.string(),
  type: systemTypeSchema,
  factionSymbol: z.string(),
  x: z.number(),
  y: z.number(),
  distance: z.number()
});

export type ConnectedSystem = z.infer<typeof connectedSystemSchema>;
