import z from "zod";
import { systemTypeSchema } from "./systemTypeSchema";

export const scannedSystemSchema = z.object({
  symbol: z.string().min(1),
  sectorSymbol: z.string().min(1),
  type: systemTypeSchema,
  x: z.number(),
  y: z.number(),
  distance: z.number(),
});

export type ScannedSystem = z.infer<typeof scannedSystemSchema>;
