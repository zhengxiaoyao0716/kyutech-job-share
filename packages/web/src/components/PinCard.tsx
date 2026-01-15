import type { ReactNode } from "react";
import css from "./PinCard.module.css";

const PinCard = ({ children }: { children: ReactNode }) => (
  <div className={css.card}>{children}</div>
);
export default PinCard;
