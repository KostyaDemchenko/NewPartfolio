import Accordion from "@/src/components/Accordion";
import "./style.scss";

const Anchors = () => {
  return (
    <div className='accordion-container'>
      <Accordion title='Personal Info' show>
        <ul>
          <li>
            <a href='#about-me'>
              <i className='ri-creative-commons-by-fill'></i>
              Bio
            </a>
          </li>
          <li>
            <a href='#skills'>
              <i className='ri-settings-3-line'></i>
              Skills
            </a>
          </li>
          <li>
            <a href='#experience'>
              <i className='ri-chat-history-line'></i>
              Experience
            </a>
          </li>
          <li>
            <a href='#education'>
              <i className='ri-file-list-3-fill'></i>
              Education / Courses
            </a>
          </li>
        </ul>
      </Accordion>
      <Accordion title='contact' show>
        <ul>
          <li>
            <a href='mailto:kostiantyn.demchenko.work@gmail.com'>
              <i className='ri-mail-fill'></i>
              kostiantyn.demchenko.work@gmail.com
            </a>
          </li>
          <li>
            <a href='tel:+380989122846'>
              <i className='ri-phone-fill'></i>
              +380 98 91 22 846
            </a>
          </li>
          <li>
            <a href='https://t.me/amateur_japanese_animation'>
              <i className='ri-telegram-fill'></i>
              telegram
            </a>
          </li>
        </ul>
      </Accordion>
    </div>
  );
};

export default Anchors;
