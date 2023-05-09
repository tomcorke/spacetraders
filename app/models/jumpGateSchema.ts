import z from "zod";

export const jumpGateSchema = z.object({
  jumpRange: z.number(),
  factionSymbol: z.string(),
  connectedSystems: z.array()
});

export type JumpGate = z.infer<typeof jumpGateSchema>;
