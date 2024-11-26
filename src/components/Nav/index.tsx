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
        href='./experience'
        className={router.pathname === "/projects" ? "active" : ""}
      >
        _projects
      </a>
    </nav>
  );
};

export default Nav;
