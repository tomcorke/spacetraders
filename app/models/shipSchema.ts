import z from "zod";
import { shipRegistrationSchema } from "./shipRegistrationSchema";
import { shipNavSchema } from "./shipNavSchema";
import { shipCrewSchema } from "./shipCrewSchema";
import { shipFrameSchema } from "./shipFrameSchema";
import { shipReactorSchema } from "./shipReactorSchema";
import { shipEngineSchema } from "./shipEngineSchema";
import { shipCargoSchema } from "./shipCargoSchema";
import { shipFuelSchema } from "./shipFuelSchema";

export const shipSchema = z.object({
  symbol: z.string(),
  registration: shipRegistrationSchema,
  nav: shipNavSchema,
  crew: shipCrewSchema,
  frame: shipFrameSchema,
  reactor: shipReactorSchema,
  engine: shipEngineSchema,
  modules: z.array(),
  mounts: z.array(),
  cargo: shipCargoSchema,
  fuel: shipFuelSchema
});

export type Ship = z.infer<typeof shipSchema>;
