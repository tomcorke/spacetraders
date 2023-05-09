import z from "zod";

export const shipRoleSchema = z.string();

export type ShipRole = z.infer<typeof shipRoleSchema>;
