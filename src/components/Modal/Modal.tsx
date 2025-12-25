import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

const modalRoot = document.querySelector("#modal-root") as HTMLElement;

const Modal = ({ children, onClose }: ModalProps) => {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return createPortal(
    <div
      className={css.backdrop}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={css.content}>{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;
