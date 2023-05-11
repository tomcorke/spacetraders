import type { PropsWithChildren } from "react";
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

import { withRetry } from "~/services/retry";
import type { Token } from "~/services/spacetraders-schema";

import { AuthContext } from "./AuthContext";

export const createGenericContext = <T extends {}>(
  dataProvider: (token: Token) => Promise<T>
) => {
  type ContextState = { data?: T };

  const Context = createContext<ContextState>({});

  const ContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const { token } = useContext(AuthContext);

    const [data, setData] = useState<T | undefined>(undefined);

    useEffect(() => {
      if (!token) {
        setData(undefined);
        return;
      }

      withRetry(() => dataProvider(token))
        .then((data) => {
          setData(data);
        })
        .catch((err) => console.error(`Error fetching data: ${err}`));
    }, [token]);

    return <Context.Provider value={{ data }}>{children}</Context.Provider>;
  };

  return { Context, ContextProvider };
};

const isGenerator = <T extends {}>(
  data: T[] | AsyncGenerator<T>
): data is AsyncGenerator<T> => {
  return Symbol.iterator in data;
};

export const createGenericGeneratorContext = <T extends {}>(
  dataProvider: (token: Token) => AsyncGenerator<T>
) => {
  type ContextState = { data?: T[] };

  const Context = createContext<ContextState>({});

  const ContextProvider = ({ children }: PropsWithChildren<{}>) => {
    const { token } = useContext(AuthContext);

    const [data, setData] = useState<T[] | undefined>(undefined);

    useEffect(() => {
      async function fetchData() {
        if (!token) {
          setData(undefined);
          return;
        }

        let iterableAccumulator: T[] = [];

        const data = await dataProvider(token);

        for await (const item of data) {
          iterableAccumulator.push(item);
        }
        setData(iterableAccumulator);
      }
      fetchData();
    }, [token]);

    return <Context.Provider value={{ data }}>{children}</Context.Provider>;
  };

  return { Context, ContextProvider };
};
