import { Accordion, AccordionItem } from "@nextui-org/accordion";
import Link from "next/link";
import "./style.scss";

const Anchors = () => {
  return (
    <div className='anchors-container'>
      <Accordion>
        <AccordionItem
          key='1'
          title='Personal Info'
          className='accordion-trigger'
        >
          <ul>
            <li>
              <Link href='#about-me'>About Me</Link>
            </li>
            <li>
              <Link href='#skills'>Skills</Link>
            </li>
            <li>
              <Link href='#experience'>Experience</Link>
            </li>
            <li>
              <Link href='#education'>Education / Courses</Link>
            </li>
          </ul>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Anchors;
