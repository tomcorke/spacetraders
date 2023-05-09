import z from "zod";
import { systemTypeSchema } from "./systemTypeSchema";

export const connectedSystemSchema = z.object({
  symbol: z.string().min(1),
  sectorSymbol: z.string().min(1),
  type: systemTypeSchema,
  factionSymbol: z.string(),
  x: z.number(),
  y: z.number(),
  distance: z.number()
});

export type ConnectedSystem = z.infer<typeof connectedSystemSchema>;
