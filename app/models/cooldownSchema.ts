import z from "zod";

export const cooldownSchema = z.object({
  shipSymbol: z.string().min(1),
  totalSeconds: z.number(),
  remainingSeconds: z.number(),
  expiration: z.string().datetime()
});

export type Cooldown = z.infer<typeof cooldownSchema>;
