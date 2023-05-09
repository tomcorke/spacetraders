import z from "zod";

export const cooldownSchema = z.object({
  // The symbol of the ship that is on cooldown
  shipSymbol: z.string().min(1),
  // The total duration of the cooldown in seconds
  totalSeconds: z.number().min(0),
  // The remaining duration of the cooldown in seconds
  remainingSeconds: z.number().min(0),
  // The date and time when the cooldown expires in ISO 8601 format
  expiration: z.string().datetime(),
});

export type Cooldown = z.infer<typeof cooldownSchema>;
