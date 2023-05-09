import z from "zod";

export const factionSchema = z.object({
  symbol: z.string(),
  name: z.string(),
  description: z.string(),
  headquarters: z.string(),
  traits: z.array()
});

export type Faction = z.infer<typeof factionSchema>;
