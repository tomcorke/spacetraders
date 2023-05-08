import STYLES from "./Agent.module.css";
import { useContext } from "react";
import { AgentContext } from "~/contexts/AgentContext";

export const Agent = () => {
  const agentContext = useContext(AgentContext);

  if (!agentContext.agent) {
    return null;
  }

  const { agent } = agentContext;

  return (
    <div className={STYLES.Agent}>
      {[
        ["Account ID", agent.accountId],
        ["Symbol", agent.symbol],
        ["Credits", agent.credits],
        ["Headquarters", agent.headquarters],
      ].map(([label, value]) => (
        <div key={label} className={STYLES.Row}>
          <div className={STYLES.Label}>{label}</div>
          <div className={STYLES.Value}>{value}</div>
        </div>
      ))}
    </div>
  );
};
