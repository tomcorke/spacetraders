import z from "zod";

export const extractionYieldSchema = z.object({
  symbol: z.string().min(1),
  // The number of units extracted that were placed into the ship's cargo hold.
  units: z.number(),
});

export type ExtractionYield = z.infer<typeof extractionYieldSchema>;
