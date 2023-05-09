import z from "zod";

export const factionTraitSchema = z.object({
  symbol: z.string(),
  name: z.string(),
  description: z.string()
});

export type FactionTrait = z.infer<typeof factionTraitSchema>;
