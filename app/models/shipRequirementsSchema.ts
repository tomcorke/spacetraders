import z from "zod";

export const shipRequirementsSchema = z.object({
  // The amount of power required from the reactor.
  power: z.number().optional(),
  // The number of crew required for operation.
  crew: z.number().optional(),
  // The number of module slots required for installation.
  slots: z.number().optional(),
});

export type ShipRequirements = z.infer<typeof shipRequirementsSchema>;
