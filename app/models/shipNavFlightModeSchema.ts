import z from "zod";

export const shipNavFlightModeSchema = z.enum(["DRIFT", "STEALTH", "CRUISE", "BURN"]);

export type ShipNavFlightMode = z.infer<typeof shipNavFlightModeSchema>;
