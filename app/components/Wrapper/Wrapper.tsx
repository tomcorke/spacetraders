import type { PropsWithChildren } from "react";

import { ContextProviderWrapper } from "./ContextProviderWrapper";

import STYLES from "./Wrapper.module.css";

export const Wrapper = ({ children }: PropsWithChildren<{}>) => (
  <div className={STYLES.Wrapper}>
    <ContextProviderWrapper>{children}</ContextProviderWrapper>
  </div>
);
