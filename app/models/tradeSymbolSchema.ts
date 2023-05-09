import z from "zod";

export const tradeSymbolSchema = z.string();

export type TradeSymbol = z.infer<typeof tradeSymbolSchema>;
