import type { PropsWithChildren } from "react";

import STYLES from "./Wrapper.module.css";
import { ContextProviderWrapper } from "./ContextProviderWrapper";

export const Wrapper = ({ children }: PropsWithChildren<{}>) => (
  <div className={STYLES.Wrapper}>
    <ContextProviderWrapper>{children}</ContextProviderWrapper>
  </div>
);
