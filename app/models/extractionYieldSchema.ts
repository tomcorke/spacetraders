import z from "zod";

export const extractionYieldSchema = z.object({
  symbol: z.string(),
  units: z.number()
});

export type ExtractionYield = z.infer<typeof extractionYieldSchema>;
