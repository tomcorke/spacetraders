import z from "zod";

export const waypointTypeSchema = z.string();

export type WaypointType = z.infer<typeof waypointTypeSchema>;
