import z from "zod";
import { tradeSymbolSchema } from "./tradeSymbolSchema";

export const tradeGoodSchema = z.object({
  symbol: tradeSymbolSchema,
  name: z.string(),
  description: z.string()
});

export type TradeGood = z.infer<typeof tradeGoodSchema>;
