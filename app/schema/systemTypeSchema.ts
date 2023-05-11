import z from "zod";

export const systemTypeSchema = z.enum(["NEUTRON_STAR", "RED_STAR", "ORANGE_STAR", "BLUE_STAR", "YOUNG_STAR", "WHITE_DWARF", "BLACK_HOLE", "HYPERGIANT", "NEBULA", "UNSTABLE"]);

export type SystemType = z.infer<typeof systemTypeSchema>;
