import z from "zod";

export const agentSchema = z.object({
  accountId: z.string().min(1),
  symbol: z.string().min(1),
  // The headquarters of the agent.
  headquarters: z.string().min(1),
  // The number of credits the agent has available. Credits can be negative if funds have been overdrawn.
  credits: z.number(),
});

export type Agent = z.infer<typeof agentSchema>;
