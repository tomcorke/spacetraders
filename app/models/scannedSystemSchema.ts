import z from "zod";
import { systemTypeSchema } from "./systemTypeSchema";

export const scannedSystemSchema = z.object({
  symbol: z.string(),
  sectorSymbol: z.string(),
  type: systemTypeSchema,
  x: z.number(),
  y: z.number(),
  distance: z.number()
});

export type ScannedSystem = z.infer<typeof scannedSystemSchema>;
