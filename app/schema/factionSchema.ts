import z from "zod";
import { factionTraitSchema } from "./factionTraitSchema";

export const factionSchema = z.object({
  symbol: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  headquarters: z.string().min(1),
  traits: z.array(
    factionTraitSchema
  ),
});

export type Faction = z.infer<typeof factionSchema>;
