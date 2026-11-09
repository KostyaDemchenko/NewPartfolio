import { useState } from "react";
import Link from "next/link";
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
        <Link href='/' className='autor'>
          kostiantyn-demchenko
        </Link>
        <Nav />
      </div>
      <Link className='contact' href='/contact_me'>
        _contact-me
      </Link>

      <button
        type='button'
        className='menu-button'
        onClick={toggleMenu}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
      >
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
