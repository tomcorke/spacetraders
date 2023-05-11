import z from "zod";

export const shipFuelSchema = z.object({
  // The current amount of fuel in the ship's tanks.
  current: z.number().min(0),
  // The maximum amount of fuel the ship's tanks can hold.
  capacity: z.number().min(0),
  consumed: z.object({
    // The amount of fuel consumed by the most recent transit or action.
    amount: z.number().min(0),
    // The time at which the fuel was consumed.
    timestamp: z.string().datetime(),
  }).optional(),
});

export type ShipFuel = z.infer<typeof shipFuelSchema>;
