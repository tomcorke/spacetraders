import z from "zod";

export const shipCrewSchema = z.object({
  current: z.number(),
  required: z.number(),
  capacity: z.number(),
  rotation: z.string(),
  morale: z.number(),
  wages: z.number()
});

export type ShipCrew = z.infer<typeof shipCrewSchema>;
