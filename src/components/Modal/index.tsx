import React, { useEffect, useState } from "react";
import ModalPortal from "@/src/components/PortalWrapper";

import "./style.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const ANIMATION_DURATION = 300;
const OPEN_DELAY = 50;

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [renderState, setRenderState] = useState(isOpen);
  const [visibleState, setVisibleState] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setRenderState(true);
      setVisibleState(false);

      const openTimer = setTimeout(() => {
        setVisibleState(true);
      }, OPEN_DELAY);

      return () => clearTimeout(openTimer);
    } else {
      setVisibleState(false);

      const closeTimer = setTimeout(() => {
        setRenderState(false);
      }, ANIMATION_DURATION);

      return () => clearTimeout(closeTimer);
    }
  }, [isOpen]);

  if (!renderState) {
    return null;
  }

  const overlayClass = `ModalOverlay ${visibleState ? "open" : ""}`;
  const contentClass = `ModalContent ${visibleState ? "open" : ""}`;

  const handleOverlayClick = () => {
    onClose();
  };
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <ModalPortal>
      <div className={overlayClass} onClick={handleOverlayClick}>
        <div className={contentClass} onClick={stopPropagation}>
          {children}
        </div>
      </div>
    </ModalPortal>
  );
};

export default Modal;
