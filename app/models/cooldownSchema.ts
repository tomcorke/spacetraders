import z from "zod";

export const cooldownSchema = z.object({
  shipSymbol: z.string(),
  totalSeconds: z.number(),
  remainingSeconds: z.number(),
  expiration: z.string()
});

export type Cooldown = z.infer<typeof cooldownSchema>;
