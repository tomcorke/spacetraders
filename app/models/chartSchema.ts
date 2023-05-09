import z from "zod";

export const chartSchema = z.object({
  waypointSymbol: z.string(),
  submittedBy: z.string(),
  submittedOn: z.string().datetime()
});

export type Chart = z.infer<typeof chartSchema>;
