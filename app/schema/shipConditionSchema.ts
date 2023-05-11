import z from "zod";

export const shipConditionSchema = z.number().min(0).max(100);

export type ShipCondition = z.infer<typeof shipConditionSchema>;
