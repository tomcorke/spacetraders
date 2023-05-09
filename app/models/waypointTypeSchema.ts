import z from "zod";

export const waypointTypeSchema = z.enum(["PLANET", "GAS_GIANT", "MOON", "ORBITAL_STATION", "JUMP_GATE", "ASTEROID_FIELD", "NEBULA", "DEBRIS_FIELD", "GRAVITY_WELL"]);

export type WaypointType = z.infer<typeof waypointTypeSchema>;
