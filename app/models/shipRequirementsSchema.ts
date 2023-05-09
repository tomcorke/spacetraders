import z from "zod";

export const shipRequirementsSchema = z.object({
  power: z.number(),
  crew: z.number(),
  slots: z.number()
});

export type ShipRequirements = z.infer<typeof shipRequirementsSchema>;
