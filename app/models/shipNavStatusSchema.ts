import z from "zod";

export const shipNavStatusSchema = z.string();

export type ShipNavStatus = z.infer<typeof shipNavStatusSchema>;
