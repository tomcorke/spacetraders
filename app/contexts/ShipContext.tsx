import type { Token } from "~/services/spacetraders-schema";
import { myShips } from "~/services/spacetraders";

import { createGenericContext } from "./GenericContext";

const { Context: ShipContext, ContextProvider: ShipContextProvider } =
  createGenericContext((token: Token) => myShips(token));

export { ShipContext, ShipContextProvider };
