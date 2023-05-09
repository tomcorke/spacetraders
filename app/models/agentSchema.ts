import z from "zod";

export const agentSchema = z.object({
  accountId: z.string().min(1),
  symbol: z.string().min(1),
  headquarters: z.string().min(1),
  credits: z.number()
});

export type Agent = z.infer<typeof agentSchema>;
