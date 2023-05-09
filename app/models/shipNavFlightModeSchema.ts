import z from "zod";

export const shipNavFlightModeSchema = z.string();

export type ShipNavFlightMode = z.infer<typeof shipNavFlightModeSchema>;
