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
        href='./about-me'
        className={router.pathname === "/about-me" ? "active" : ""}
      >
        _about-me
      </a>
      <a
        href='./projects'
        className={router.pathname === "/projects" ? "active" : ""}
      >
        _projects
      </a>
    </nav>
  );
};

export default Nav;
