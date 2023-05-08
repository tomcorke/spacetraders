import type { PropsWithChildren } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import type { Agent } from "~/services/spacetraders";
import { getProfile } from "~/services/spacetraders";
import { AuthContext } from "./AuthContext";
import { withRetry } from "~/services/retry";

export type AgentState = {
  agent?: Agent;
};

export const AgentContext = createContext<AgentState>({});

export const AgentContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const { token } = useContext(AuthContext);

  const [agent, setAgent] = useState<Agent | undefined>(undefined);

  // Update agent on token change
  useEffect(() => {
    if (!token) {
      setAgent(undefined);
      return;
    }

    withRetry(() => getProfile(token))
      .then((profile) => {
        setAgent(profile.agent);
      })
      .catch((err) => console.error(`Error loading profile: ${err}`));
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
