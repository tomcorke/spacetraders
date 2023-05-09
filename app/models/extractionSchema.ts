import z from "zod";
import { extractionYieldSchema } from "./extractionYieldSchema";

export const extractionSchema = z.object({
  shipSymbol: z.string(),
  yield: extractionYieldSchema
});

export type Extraction = z.infer<typeof extractionSchema>;
