import "./style.scss";

const Footer = () => {
  return (
    <footer>
      <div className='find-me-box'>
        <div className='left-site'>
          <p className='description'>_find-me-in</p>
          <a
            href='https://www.linkedin.com/in/kostiantyn-demchenko-14874224a/'
            className='social-link'
            target='_blank'
          >
            <i className='ri-linkedin-fill'></i>
          </a>
          <a
            href='https://t.me/amateur_japanese_animation'
            className='social-link'
            target='_blank'
          >
            <i className='ri-telegram-fill'></i>
          </a>
          <a
            href='mailto:kostiantyn.demchenko.work@gmail.com
'
            className='social-link'
            target='_blank'
          >
            <i className='ri-mail-fill'></i>
          </a>
        </div>
        <div className='right-site'>
          <a
            className='github-link'
            target='_blank'
            href='https://github.com/KostyaDemchenko'
          >
            @KostyaDemchenko <i className='ri-github-fill'></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
