import z from "zod";

export const systemFactionSchema = z.object({
  symbol: z.string()
});

export type SystemFaction = z.infer<typeof systemFactionSchema>;
