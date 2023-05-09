import z from "zod";
import { shipRegistrationSchema } from "./shipRegistrationSchema";
import { shipNavSchema } from "./shipNavSchema";

export const scannedShipSchema = z.object({
  symbol: z.string(),
  registration: shipRegistrationSchema,
  nav: shipNavSchema,
  frame: z.object({
    symbol: z.string()
}),
  reactor: z.object({
    symbol: z.string()
}),
  engine: z.object({
    symbol: z.string()
}),
  mounts: z.array()
});

export type ScannedShip = z.infer<typeof scannedShipSchema>;
