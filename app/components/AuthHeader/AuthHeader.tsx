import { useContext } from "react";
import { AuthContext } from "~/contexts/AuthContext";

import STYLES from "./AuthHeader.module.css";
import { FACTION } from "~/services/spacetraders";
import { AgentContext } from "~/contexts/AgentContext";

export const AuthHeader = () => {
  const authContext = useContext(AuthContext);
  const { agent } = useContext(AgentContext);

  const register = async () => {
    await authContext.register("TEST_SHOT", FACTION.COSMIC);
  };

  const logOut = async () => {
    await authContext.logOut();
  };

  const isLoggedIn = !!(authContext.token && agent);

  return (
    <div className={STYLES.AuthHeader}>
      {isLoggedIn ? (
        <>
          <div>Logged in as {agent.symbol}</div>
          <span className={STYLES.Button} onClick={logOut}>
            Log out
          </span>
        </>
      ) : (
        <>
          <div>Not logged in</div>
          <span className={STYLES.Button} onClick={register}>
            Register
          </span>{" "}
        </>
      )}
    </div>
  );
};
