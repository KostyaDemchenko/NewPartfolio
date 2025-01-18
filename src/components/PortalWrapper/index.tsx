import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

/**
 * ModalPortal: динамически создаёт <div> и монтирует его в document.body,
 * затем рендерит `children` в этот div (помогает сделать модалку поверх всего).
 */

const ModalPortal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [container] = useState(() => {
    if (typeof window === "undefined") return null;
    return document.createElement("div");
  });

  useEffect(() => {
    if (!container) return;
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  if (!container) return null;
  return ReactDOM.createPortal(children, container);
};

export default ModalPortal;
