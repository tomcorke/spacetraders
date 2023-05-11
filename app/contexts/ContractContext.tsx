import { myContracts } from "~/services/spacetraders";
import type { Token } from "~/services/spacetraders-schema";

import { createGenericContext } from "./GenericContext";

const { Context: ContractContext, ContextProvider: ContractContextProvider } =
  createGenericContext((token: Token) => myContracts(token));

export { ContractContext, ContractContextProvider };
