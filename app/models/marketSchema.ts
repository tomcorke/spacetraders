import z from "zod";

export const marketSchema = z.object({
  symbol: z.string(),
  exports: z.array(),
  imports: z.array(),
  exchange: z.array(),
  transactions: z.array(),
  tradeGoods: z.array()
});

export type Market = z.infer<typeof marketSchema>;
