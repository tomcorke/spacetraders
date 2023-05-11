import type { PropsWithChildren } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

import { getProfile } from "~/services/spacetraders";
import { withRetry } from "~/services/retry";
import type { Agent } from "~/schema/agentSchema";

import { AuthContext } from "./AuthContext";

export type AgentState = {
  agent?: Agent;
};

export const AgentContext = createContext<AgentState>({});

export const AgentContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const { token } = useContext(AuthContext);

  const [agent, setAgent] = useState<Agent | undefined>(undefined);

  // Update on token change
  useEffect(() => {
    if (!token) {
      setAgent(undefined);
      return;
    }

    withRetry(() => getProfile(token))
      .then((profile) => {
        setAgent(profile.agent);
      })
      .catch((err) => console.error(`Error loading agent: ${err}`));
  }, [token]);

  return (
    <AgentContext.Provider
      value={{
        agent,
      }}
    >
      {children}
    </AgentContext.Provider>
  );
};
