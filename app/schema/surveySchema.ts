import z from "zod";
import { surveyDepositSchema } from "./surveyDepositSchema";

export const surveySchema = z.object({
  // A unique signature for the location of this survey. This signature is verified when attempting an extraction using this survey.
  signature: z.string().min(1),
  // The symbol of the waypoint that this survey is for.
  symbol: z.string().min(1),
  // A list of deposits that can be found at this location.
  deposits: z.array(
    surveyDepositSchema
  ),
  // The date and time when the survey expires. After this date and time, the survey will no longer be available for extraction.
  expiration: z.string().datetime(),
  // The size of the deposit. This value indicates how much can be extracted from the survey before it is exhausted.
  size: z.enum(["SMALL", "MODERATE", "LARGE"]),
});

export type Survey = z.infer<typeof surveySchema>;
