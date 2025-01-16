import { useRouter } from "next/router";

import "./style.scss";

const Nav = () => {
  const router = useRouter();

  return (
    <nav>
      <a href='./' className={router.pathname === "/" ? "active" : ""}>
        _hello
      </a>
      <a
        href='./experience'
        className={router.pathname === "/experience" ? "active" : ""}
      >
        _experience
      </a>
      <a
        href='./projects'
        className={router.pathname === "/projects" ? "active" : ""}
      >
        _projects
      </a>
      <a
        href='./contact_me'
        className={`tablet ${
          router.pathname === "/contact_me" ? "active" : ""
        }`}
      >
        _contact-me
      </a>
    </nav>
  );
};

export default Nav;
