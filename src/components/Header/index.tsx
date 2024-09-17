import Nav from "@/src/components/Nav";

import "./style.scss";

const Header = () => {
  return (
    <header>
      <div className='left-site'>
        <h2 className='autor'>kostiantyn-demchenko</h2>
        <Nav />
      </div>
      <a className='contact' href='./contact-me'>
        _contact-me
      </a>
    </header>
  );
};

export default Header;
