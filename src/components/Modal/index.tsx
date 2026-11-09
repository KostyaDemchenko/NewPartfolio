import React, { useEffect, useState } from "react";
import ModalPortal from "@/src/components/PortalWrapper";

import "./style.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  label?: string;
  children: React.ReactNode;
}

const ANIMATION_DURATION = 300;
const OPEN_DELAY = 20;

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, label, children }) => {
  const [renderState, setRenderState] = useState(isOpen);
  const [visibleState, setVisibleState] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setRenderState(true);
      const openTimer = setTimeout(() => setVisibleState(true), OPEN_DELAY);
      return () => clearTimeout(openTimer);
    }
    setVisibleState(false);
    const closeTimer = setTimeout(() => setRenderState(false), ANIMATION_DURATION);
    return () => clearTimeout(closeTimer);
  }, [isOpen]);

  // Close on Escape and keep the page behind the modal from scrolling.
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!renderState) return null;

  return (
    <ModalPortal>
      <div className={`ModalOverlay ${visibleState ? "open" : ""}`} onClick={onClose}>
        <div
          className={`ModalContent ${visibleState ? "open" : ""}`}
          role='dialog'
          aria-modal='true'
          aria-label={label}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </ModalPortal>
  );
};

export default Modal;
