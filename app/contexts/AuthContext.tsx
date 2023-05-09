import type { PropsWithChildren } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import type { FACTION } from "~/services/spacetraders";
import { register } from "~/services/spacetraders";
import z from "zod";
import type { Token } from "~/services/spacetraders-schema";
import { tokenSchema } from "~/services/spacetraders-schema";

export type AuthState = {
  register: (symbol: string, faction: FACTION) => Promise<void>;
  logOut: () => Promise<void>;
  token?: Token;
};

export const AuthContext = createContext<AuthState>({
  register: async () => {},
  logOut: async () => {},
});

const storedTokenSchema = z.object({
  token: tokenSchema,
});

export const AuthContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [token, setToken] = useState<Token | undefined>(undefined);
  const [authError, setAuthError] = useState<string | undefined>(undefined);

  const setAndSaveToken = useCallback(
    async (token: Token) => {
      await fetch("/saveToken", {
        method: "POST",
        body: JSON.stringify({ token }),
      });
      setToken(token);
    },
    [setToken]
  );

  // Provide register function to create a new account
  const doRegister = useCallback(
    async (symbol: string, faction: FACTION) => {
      try {
        const profile = await register({ symbol, faction });
        await setAndSaveToken(profile.data.token);
      } catch (err: any) {
        setAuthError(err.toString());
      }
    },
    [setAndSaveToken, setAuthError]
  );

  const doLogOut = useCallback(async () => {
    setToken(undefined);
  }, [setToken]);

  // Load user's token from file on init
  useEffect(() => {
    fetch("/loadSavedToken")
      .then((response) => response.json())
      .then((tokenData) => {
        const { token } = storedTokenSchema.parse(tokenData);
        setToken(token);
      })
      .catch((err) => console.error(`Error loading token: ${err}`));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        register: doRegister,
        logOut: doLogOut,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
