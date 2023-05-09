import z from "zod";
import { shipRequirementsSchema } from "./shipRequirementsSchema";

export const shipMountSchema = z.object({
  symbol: z.enum(["MOUNT_GAS_SIPHON_I", "MOUNT_GAS_SIPHON_II", "MOUNT_GAS_SIPHON_III", "MOUNT_SURVEYOR_I", "MOUNT_SURVEYOR_II", "MOUNT_SURVEYOR_III", "MOUNT_SENSOR_ARRAY_I", "MOUNT_SENSOR_ARRAY_II", "MOUNT_SENSOR_ARRAY_III", "MOUNT_MINING_LASER_I", "MOUNT_MINING_LASER_II", "MOUNT_MINING_LASER_III", "MOUNT_LASER_CANNON_I", "MOUNT_MISSILE_LAUNCHER_I", "MOUNT_TURRET_I"]),
  name: z.string(),
  description: z.string().optional(),
  strength: z.number().min(0).optional(),
  deposits: z.array(
    z.enum(["QUARTZ_SAND", "SILICON_CRYSTALS", "PRECIOUS_STONES", "ICE_WATER", "AMMONIA_ICE", "IRON_ORE", "COPPER_ORE", "SILVER_ORE", "ALUMINUM_ORE", "GOLD_ORE", "PLATINUM_ORE", "DIAMONDS", "URANITE_ORE", "MERITIUM_ORE"])
  ).optional(),
  requirements: shipRequirementsSchema,
});

export type ShipMount = z.infer<typeof shipMountSchema>;
