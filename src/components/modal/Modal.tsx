import React from "react";
import { CloseIcon } from "../close-icon";
import styles from "./Modal.module.css";

type Props = {
  isOpen: boolean;
  close: () => void;
  title: string;
  children?: React.ReactNode;
};

const Modal: React.FC<Props> = ({ children, isOpen, close, title }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.backdrop}>
      <dialog open={isOpen} className={styles.dialog}>
        <div className={styles.header}>
          <h3>{title}</h3>
          <button onClick={close}>
            <CloseIcon />
          </button>
        </div>
        {children}
      </dialog>
    </div>
  );
};

export default Modal;
