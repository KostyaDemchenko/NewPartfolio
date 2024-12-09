import { useState } from "react";
import Nav from "@/src/components/Nav";
import Footer from "@/src/components/Footer";

import "./style.scss";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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

      <button className='menu-button' onClick={toggleMenu}>
        {isMenuOpen ? (
          <i className='ri-close-fill'></i>
        ) : (
          <i className='ri-menu-fill'></i>
        )}
      </button>

      <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
        <Nav />
        <Footer />
      </div>
    </header>
  );
};

export default Header;
