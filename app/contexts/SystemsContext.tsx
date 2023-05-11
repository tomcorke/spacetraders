import { listAllSystems } from "~/services/spacetraders";
import type { Token } from "~/services/spacetraders-schema";

import { createGenericGeneratorContext } from "./GenericContext";

const { Context: SystemsContext, ContextProvider: SystemsContextProvider } =
  createGenericGeneratorContext((token: Token) => listAllSystems(token));

export { SystemsContext, SystemsContextProvider };
