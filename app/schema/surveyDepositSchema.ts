import z from "zod";

export const surveyDepositSchema = z.object({
  // The symbol of the deposit.
  symbol: z.string(),
});

export type SurveyDeposit = z.infer<typeof surveyDepositSchema>;
