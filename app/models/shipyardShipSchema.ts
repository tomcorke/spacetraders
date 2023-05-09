import z from "zod";
import { shipTypeSchema } from "./shipTypeSchema";
import { shipFrameSchema } from "./shipFrameSchema";
import { shipReactorSchema } from "./shipReactorSchema";
import { shipEngineSchema } from "./shipEngineSchema";
import { shipModuleSchema } from "./shipModuleSchema";
import { shipMountSchema } from "./shipMountSchema";

export const shipyardShipSchema = z.object({
  type: shipTypeSchema.optional(),
  name: z.string(),
  description: z.string(),
  purchasePrice: z.number(),
  frame: shipFrameSchema,
  reactor: shipReactorSchema,
  engine: shipEngineSchema,
  modules: z.array(
    shipModuleSchema
  ),
  mounts: z.array(
    shipMountSchema
  ),
});

export type ShipyardShip = z.infer<typeof shipyardShipSchema>;
