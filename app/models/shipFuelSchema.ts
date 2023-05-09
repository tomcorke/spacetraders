import z from "zod";

export const shipFuelSchema = z.object({
  current: z.number(),
  capacity: z.number(),
  consumed: z.object({
    amount: z.number(),
    timestamp: z.string()
})
});

export type ShipFuel = z.infer<typeof shipFuelSchema>;
