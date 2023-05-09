import z from "zod";

export const marketTradeGoodSchema = z.object({
  symbol: z.string(),
  tradeVolume: z.number(),
  supply: z.enum(["SCARCE", "LIMITED", "MODERATE", "ABUNDANT"]),
  purchasePrice: z.number(),
  sellPrice: z.number()
});

export type MarketTradeGood = z.infer<typeof marketTradeGoodSchema>;
