import z from "zod";

export const surveySchema = z.object({
  signature: z.string(),
  symbol: z.string(),
  deposits: z.array(),
  expiration: z.string(),
  size: z.string()
});

export type Survey = z.infer<typeof surveySchema>;
