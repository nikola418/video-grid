import CloseSVG from "@/assets/icons/close.svg?react";
import React from "react";
import { Button } from "../button";
import { closeOnBackdrop } from "./close-on-backdrop";

type Props = {
  ref: React.RefObject<HTMLDialogElement | null>;
  title: string;
} & React.PropsWithChildren;

const Modal: React.FC<Props> = ({ children, ref, title }) => {
  return (
    <dialog
      ref={ref}
      className="top-[50%] left-[50%] z-50 max-w-[80%] translate-[-50%] transform p-2 backdrop:bg-black/50 dark:bg-slate-700 dark:text-white"
      onClick={(e) => {
        if (ref.current) {
          closeOnBackdrop(e, ref.current);
        }
      }}
    >
      <div className="flex justify-between">
        <h3 className="text-2xl">{title}</h3>
        <Button onClick={() => ref.current?.close()} className="bg-none">
          <CloseSVG className="text-black dark:text-white" />
        </Button>
      </div>
      {children}
    </dialog>
  );
};

export default Modal;
