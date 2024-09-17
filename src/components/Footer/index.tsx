import "./style.scss";

const Footer = () => {
  return (
    <footer>
      <div className='find-me-box'>
        <div className='left-site'>
          <p className='description'>_find-me-in</p>
          <i className='ri-linkedin-fill'></i>
          <i className='ri-telegram-fill'></i>
          <i className='ri-mail-fill'></i>
        </div>
        <div className='right-site'>
          <a className='github-link' href='https://github.com/KostyaDemchenko'>
            @KostyaDemchenko <i className='ri-github-fill'></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
