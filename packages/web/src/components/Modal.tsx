import type { ReactNode } from "react";
import css from "./Modal.module.css";
export const Modal = ({ children = null }: { children?: ReactNode | null }) => (
  <div className={css.modal}>{children}</div>
);
