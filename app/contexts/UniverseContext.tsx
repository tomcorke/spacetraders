import type { PropsWithChildren } from "react";
import { createContext } from "react";

import { SystemsManager } from "~/models/systems";

type UniverseContextState = {
  systemsManager: SystemsManager;
};

export const UniverseContext = createContext<UniverseContextState>({
  systemsManager: new SystemsManager(),
});

export const UniverseContextProvider = ({
  children,
}: PropsWithChildren<{}>) => {
  const state: UniverseContextState = {
    systemsManager: new SystemsManager(),
  };

  return (
    <UniverseContext.Provider value={state}>
      {children}
    </UniverseContext.Provider>
  );
};
