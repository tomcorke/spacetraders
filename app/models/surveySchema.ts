import z from "zod";

export const surveySchema = z.object({
  signature: z.string().min(1),
  symbol: z.string().min(1),
  deposits: z.array(),
  expiration: z.string().datetime(),
  size: z.enum(["SMALL", "MODERATE", "LARGE"])
});

export type Survey = z.infer<typeof surveySchema>;
