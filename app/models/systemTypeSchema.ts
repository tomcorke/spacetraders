import z from "zod";

export const systemTypeSchema = z.string();

export type SystemType = z.infer<typeof systemTypeSchema>;
