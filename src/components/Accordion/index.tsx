import { useState, useEffect } from "react";
import "./style.scss";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  show?: boolean;
}

const Accordion = ({ title, children, show }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const updateAccordionState = () => {
      if (window.innerWidth <= 570) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    updateAccordionState();

    window.addEventListener("resize", updateAccordionState);
    return () => {
      window.removeEventListener("resize", updateAccordionState);
    };
  }, []);

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className='accordion-item'>
      <button
        className={`accordion-trigger ${isOpen ? "open" : ""}`}
        onClick={toggleAccordion}
      >
        <i className='ri-arrow-right-s-fill' />
        <p>{title}</p>
      </button>
      <div className={`accordion-content ${isOpen ? "open" : ""}`}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;
