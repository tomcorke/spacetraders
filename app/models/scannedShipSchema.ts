import z from "zod";
import { shipRegistrationSchema } from "./shipRegistrationSchema";
import { shipNavSchema } from "./shipNavSchema";

export const scannedShipSchema = z.object({
  // The globally unique identifier of the ship.
  symbol: z.string(),
  registration: shipRegistrationSchema,
  nav: shipNavSchema,
  // The frame of the ship.
  frame: z.object({
    symbol: z.string(),
  }).optional(),
  // The reactor of the ship.
  reactor: z.object({
    symbol: z.string(),
  }).optional(),
  // The engine of the ship.
  engine: z.object({
    symbol: z.string(),
  }),
  mounts: z.array(
    z.object({
      symbol: z.string(),
    })
  ).optional(),
});

export type ScannedShip = z.infer<typeof scannedShipSchema>;
