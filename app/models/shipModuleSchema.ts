import z from "zod";
import { shipRequirementsSchema } from "./shipRequirementsSchema";

export const shipModuleSchema = z.object({
  symbol: z.enum(["MODULE_MINERAL_PROCESSOR_I", "MODULE_CARGO_HOLD_I", "MODULE_CREW_QUARTERS_I", "MODULE_ENVOY_QUARTERS_I", "MODULE_PASSENGER_CABIN_I", "MODULE_MICRO_REFINERY_I", "MODULE_ORE_REFINERY_I", "MODULE_FUEL_REFINERY_I", "MODULE_SCIENCE_LAB_I", "MODULE_JUMP_DRIVE_I", "MODULE_JUMP_DRIVE_II", "MODULE_JUMP_DRIVE_III", "MODULE_WARP_DRIVE_I", "MODULE_WARP_DRIVE_II", "MODULE_WARP_DRIVE_III", "MODULE_SHIELD_GENERATOR_I", "MODULE_SHIELD_GENERATOR_II"]),
  capacity: z.number(),
  range: z.number(),
  name: z.string(),
  description: z.string(),
  requirements: shipRequirementsSchema
});

export type ShipModule = z.infer<typeof shipModuleSchema>;
