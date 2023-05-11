import z from "zod";

export const shipNavStatusSchema = z.enum(["IN_TRANSIT", "IN_ORBIT", "DOCKED"]);

export type ShipNavStatus = z.infer<typeof shipNavStatusSchema>;
