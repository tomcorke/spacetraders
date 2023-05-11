import type { PropsWithChildren } from "react";

import { AgentContextProvider } from "~/contexts/AgentContext";
import { AuthContextProvider } from "~/contexts/AuthContext";
import { ContractContextProvider } from "~/contexts/ContractContext";
import { ShipContextProvider } from "~/contexts/ShipContext";
import { SystemsContextProvider } from "~/contexts/SystemsContext";
import { UniverseContextProvider } from "~/contexts/UniverseContext";

export const ContextProviderWrapper = ({ children }: PropsWithChildren<{}>) => {
  return (
    <AuthContextProvider>
      <AgentContextProvider>
        <UniverseContextProvider>{children}</UniverseContextProvider>
      </AgentContextProvider>
    </AuthContextProvider>
  );
};
