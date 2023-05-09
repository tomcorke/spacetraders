import z from "zod";

export const shipTypeSchema = z.enum(["SHIP_PROBE", "SHIP_MINING_DRONE", "SHIP_INTERCEPTOR", "SHIP_LIGHT_HAULER", "SHIP_COMMAND_FRIGATE", "SHIP_EXPLORER", "SHIP_HEAVY_FREIGHTER", "SHIP_LIGHT_SHUTTLE", "SHIP_ORE_HOUND", "SHIP_REFINING_FREIGHTER"]);

export type ShipType = z.infer<typeof shipTypeSchema>;
