import z from "zod";
import { shipRequirementsSchema } from "./shipRequirementsSchema";

export const shipMountSchema = z.object({
  symbol: z.enum(["MOUNT_GAS_SIPHON_I", "MOUNT_GAS_SIPHON_II", "MOUNT_GAS_SIPHON_III", "MOUNT_SURVEYOR_I", "MOUNT_SURVEYOR_II", "MOUNT_SURVEYOR_III", "MOUNT_SENSOR_ARRAY_I", "MOUNT_SENSOR_ARRAY_II", "MOUNT_SENSOR_ARRAY_III", "MOUNT_MINING_LASER_I", "MOUNT_MINING_LASER_II", "MOUNT_MINING_LASER_III", "MOUNT_LASER_CANNON_I", "MOUNT_MISSILE_LAUNCHER_I", "MOUNT_TURRET_I"]),
  name: z.string(),
  description: z.string(),
  strength: z.number(),
  deposits: z.array(),
  requirements: shipRequirementsSchema
});

export type ShipMount = z.infer<typeof shipMountSchema>;
