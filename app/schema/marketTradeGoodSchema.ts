import z from "zod";

export const marketTradeGoodSchema = z.object({
  // The symbol of the trade good.
  symbol: z.string(),
  // The typical volume flowing through the market for this type of good. The larger the trade volume, the more stable prices will be.
  tradeVolume: z.number().min(1),
  // A rough estimate of the total supply of this good in the marketplace.
  supply: z.enum(["SCARCE", "LIMITED", "MODERATE", "ABUNDANT"]),
  // The price at which this good can be purchased from the market.
  purchasePrice: z.number().min(0),
  // The price at which this good can be sold to the market.
  sellPrice: z.number().min(0),
});

export type MarketTradeGood = z.infer<typeof marketTradeGoodSchema>;
