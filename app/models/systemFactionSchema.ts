import z from "zod";

export const systemFactionSchema = z.object({
  symbol: z.string().min(1),
});

export type SystemFaction = z.infer<typeof systemFactionSchema>;
