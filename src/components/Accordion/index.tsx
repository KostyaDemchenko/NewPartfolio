import { useState, useEffect } from "react";
import "./style.scss";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  show?: boolean; // Новый проп для начального состояния
}

const Accordion = ({ title, children, show = false }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(show);

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    setIsOpen(show); // Обновляет состояние при изменении пропа `show`
  }, [show]);

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
