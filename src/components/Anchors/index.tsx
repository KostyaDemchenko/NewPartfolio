import Accordion from "@/src/components/Accordion";
import EmailLink from "@/src/components/EmailLink";
import { CONTACTS, CV_PDF_PATH } from "@/src/data/contacts";
import "./style.scss";

const SECTIONS = [
  { href: "#about-me", icon: "ri-creative-commons-by-fill", label: "Summary" },
  { href: "#skills", icon: "ri-settings-3-line", label: "Skills" },
  { href: "#experience", icon: "ri-chat-history-line", label: "Experience" },
  { href: "#education", icon: "ri-file-list-3-fill", label: "Education" },
  { href: "#languages", icon: "ri-translate-2", label: "Languages" },
];

const Anchors = () => {
  return (
    <div className='accordion-container'>
      <Accordion title='personal-info' show>
        <ul>
          {SECTIONS.map((section) => (
            <li key={section.href}>
              <a href={section.href}>
                <i className={section.icon} aria-hidden='true'></i>
                {section.label}
              </a>
            </li>
          ))}
          <li>
            <a href={CV_PDF_PATH} target='_blank' rel='noopener noreferrer' download>
              <i className='ri-file-download-line' aria-hidden='true'></i>
              CV (PDF)
            </a>
          </li>
        </ul>
      </Accordion>
      <Accordion title='contact' show>
        <ul>
          <li>
            <EmailLink />
          </li>
          <li>
            <a href={CONTACTS.phone.href}>
              <i className='ri-phone-fill' aria-hidden='true'></i>
              {CONTACTS.phone.label}
            </a>
          </li>
          <li>
            <a href={CONTACTS.linkedin} target='_blank' rel='noopener noreferrer'>
              <i className='ri-linkedin-box-fill' aria-hidden='true'></i>
              linkedin
            </a>
          </li>
          <li>
            <a href={CONTACTS.telegram.href} target='_blank' rel='noopener noreferrer'>
              <i className='ri-telegram-fill' aria-hidden='true'></i>
              {CONTACTS.telegram.label}
            </a>
          </li>
        </ul>
      </Accordion>
    </div>
  );
};

export default Anchors;
