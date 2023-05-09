import z from "zod";
import { shipRegistrationSchema } from "./shipRegistrationSchema";
import { shipNavSchema } from "./shipNavSchema";
import { shipCrewSchema } from "./shipCrewSchema";
import { shipFrameSchema } from "./shipFrameSchema";
import { shipReactorSchema } from "./shipReactorSchema";
import { shipEngineSchema } from "./shipEngineSchema";
import { shipModuleSchema } from "./shipModuleSchema";
import { shipMountSchema } from "./shipMountSchema";
import { shipCargoSchema } from "./shipCargoSchema";
import { shipFuelSchema } from "./shipFuelSchema";

export const shipSchema = z.object({
  // The globally unique identifier of the ship in the following format: `[AGENT_SYMBOL]_[HEX_ID]`
  symbol: z.string(),
  registration: shipRegistrationSchema,
  nav: shipNavSchema,
  crew: shipCrewSchema,
  frame: shipFrameSchema,
  reactor: shipReactorSchema,
  engine: shipEngineSchema,
  modules: z.array(
    shipModuleSchema
  ),
  mounts: z.array(
    shipMountSchema
  ),
  cargo: shipCargoSchema,
  fuel: shipFuelSchema,
});

export type Ship = z.infer<typeof shipSchema>;
