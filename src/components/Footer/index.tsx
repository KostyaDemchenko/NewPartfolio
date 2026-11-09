import { CONTACTS } from "@/src/data/contacts";
import "./style.scss";

const Footer = () => {
  return (
    <footer>
      <div className='find-me-box'>
        <div className='left-site'>
          <p className='description'>_find-me-in</p>
          <div className='links-box'>
            <a
              href={CONTACTS.linkedin}
              className='social-link'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='LinkedIn'
            >
              <i className='ri-linkedin-fill' aria-hidden='true'></i>
            </a>
            <a
              href={CONTACTS.telegram.href}
              className='social-link'
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Telegram'
            >
              <i className='ri-telegram-fill' aria-hidden='true'></i>
            </a>
            <a
              href={`mailto:${CONTACTS.email}`}
              className='social-link'
              aria-label='Email'
            >
              <i className='ri-mail-fill' aria-hidden='true'></i>
            </a>
          </div>
        </div>
        <div className='right-site'>
          <a
            className='github-link'
            target='_blank'
            rel='noopener noreferrer'
            href={CONTACTS.github}
          >
            @KostyaDemchenko <i className='ri-github-fill' aria-hidden='true'></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
