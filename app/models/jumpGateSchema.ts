import z from "zod";
import { connectedSystemSchema } from "./connectedSystemSchema";

export const jumpGateSchema = z.object({
  // The maximum jump range of the gate.
  jumpRange: z.number(),
  // The symbol of the faction that owns the gate.
  factionSymbol: z.string().optional(),
  // The systems within range of the gate that have a corresponding gate.
  connectedSystems: z.array(
    connectedSystemSchema
  ),
});

export type JumpGate = z.infer<typeof jumpGateSchema>;
