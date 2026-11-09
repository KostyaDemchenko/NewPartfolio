import { useEffect, useId, useState } from "react";
import "./style.scss";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  /** Open by default on desktop; on phones accordions start collapsed. */
  show?: boolean;
}

const MOBILE_QUERY = "(max-width: 570px)";

const Accordion = ({ title, children, show = true }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const contentId = useId();

  // React only to crossing the mobile breakpoint. Listening to every resize
  // collapsed the filters on phones whenever the browser toolbar hid on scroll.
  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY);
    const sync = () => setIsOpen(show && !media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, [show]);

  return (
    <div className='accordion-item'>
      <button
        type='button'
        className={`accordion-trigger ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <i className='ri-arrow-right-s-fill' aria-hidden='true' />
        <p>{title}</p>
      </button>
      <div id={contentId} className={`accordion-content ${isOpen ? "open" : ""}`}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;
