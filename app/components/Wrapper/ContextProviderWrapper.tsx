import type { PropsWithChildren } from "react";
import { AgentContextProvider } from "~/contexts/AgentContext";
import { AuthContextProvider } from "~/contexts/AuthContext";

export const ContextProviderWrapper = ({ children }: PropsWithChildren<{}>) => {
  return (
    <AuthContextProvider>
      <AgentContextProvider>{children}</AgentContextProvider>
    </AuthContextProvider>
  );
};
