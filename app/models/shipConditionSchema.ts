import z from "zod";

export const shipConditionSchema = z.number();

export type ShipCondition = z.infer<typeof shipConditionSchema>;
