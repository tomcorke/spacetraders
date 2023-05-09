import z from "zod";

export const surveyDepositSchema = z.object({
  symbol: z.string()
});

export type SurveyDeposit = z.infer<typeof surveyDepositSchema>;
