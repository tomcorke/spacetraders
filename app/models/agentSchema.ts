import z from "zod";

export const agentSchema = z.object({
  accountId: z.string(),
  symbol: z.string(),
  headquarters: z.string(),
  credits: z.number()
});

export type Agent = z.infer<typeof agentSchema>;
