import z from "zod";
import { tradeGoodSchema } from "./tradeGoodSchema";
import { marketTransactionSchema } from "./marketTransactionSchema";
import { marketTradeGoodSchema } from "./marketTradeGoodSchema";

export const marketSchema = z.object({
  // The symbol of the market. The symbol is the same as the waypoint where the market is located.
  symbol: z.string(),
  // The list of goods that are exported from this market.
  exports: z.array(
    tradeGoodSchema
  ),
  // The list of goods that are sought as imports in this market.
  imports: z.array(
    tradeGoodSchema
  ),
  // The list of goods that are bought and sold between agents at this market.
  exchange: z.array(
    tradeGoodSchema
  ),
  // The list of recent transactions at this market. Visible only when a ship is present at the market.
  transactions: z.array(
    marketTransactionSchema
  ).optional(),
  // The list of goods that are traded at this market. Visible only when a ship is present at the market.
  tradeGoods: z.array(
    marketTradeGoodSchema
  ).optional(),
});

export type Market = z.infer<typeof marketSchema>;
