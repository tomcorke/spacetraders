import z from "zod";

export const chartSchema = z.object({
  waypointSymbol: z.string().optional(),
  submittedBy: z.string().optional(),
  submittedOn: z.string().datetime().optional(),
});

export type Chart = z.infer<typeof chartSchema>;
