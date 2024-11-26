import Nav from "@/src/components/Nav";

import "./style.scss";

const Header = () => {
  return (
    <header>
      <div className='left-site'>
        <a href='./' className='autor'>
          kostiantyn-demchenko
        </a>
        <Nav />
      </div>
      <a className='contact' href='./contact-me'>
        _contact-me
      </a>
    </header>
  );
};

export default Header;
