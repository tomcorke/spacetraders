import z from "zod";
import { shipTypeSchema } from "./shipTypeSchema";
import { shipFrameSchema } from "./shipFrameSchema";
import { shipReactorSchema } from "./shipReactorSchema";
import { shipEngineSchema } from "./shipEngineSchema";

export const shipyardShipSchema = z.object({
  type: shipTypeSchema,
  name: z.string(),
  description: z.string(),
  purchasePrice: z.number(),
  frame: shipFrameSchema,
  reactor: shipReactorSchema,
  engine: shipEngineSchema,
  modules: z.array(),
  mounts: z.array()
});

export type ShipyardShip = z.infer<typeof shipyardShipSchema>;
