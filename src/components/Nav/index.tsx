import Link from "next/link";
import { useRouter } from "next/router";

import "./style.scss";

const LINKS = [
  { href: "/", label: "_hello" },
  { href: "/experience", label: "_experience" },
  { href: "/projects", label: "_projects" },
  { href: "/contact_me", label: "_contact-me", className: "tablet" },
];

const Nav = () => {
  const { pathname } = useRouter();

  return (
    <nav>
      {LINKS.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={[link.className, isActive ? "active" : ""].filter(Boolean).join(" ")}
            aria-current={isActive ? "page" : undefined}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
