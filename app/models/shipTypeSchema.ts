import z from "zod";

export const shipTypeSchema = z.string();

export type ShipType = z.infer<typeof shipTypeSchema>;
