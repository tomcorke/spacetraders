import z from "zod";
import { systemTypeSchema } from "./systemTypeSchema";

export const connectedSystemSchema = z.object({
  symbol: z.string().min(1),
  sectorSymbol: z.string().min(1),
  type: systemTypeSchema,
  // The symbol of the faction that owns the connected jump gate in the system.
  factionSymbol: z.string().optional(),
  x: z.number(),
  y: z.number(),
  distance: z.number(),
});

export type ConnectedSystem = z.infer<typeof connectedSystemSchema>;
