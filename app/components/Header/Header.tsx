import { Agent } from "../Agent";
import { AuthHeader } from "../AuthHeader";
import STYLES from "./Header.module.css";

export const Header = () => (
  <div className={STYLES.Header}>
    <AuthHeader />
    <Agent />
  </div>
);
