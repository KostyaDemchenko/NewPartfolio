import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import "./style.scss";

const LINKS = [
  { href: "/", label: "_hello" },
  { href: "/projects", label: "_projects" },
  { href: "/contact_me", label: "_contact-me" },
];

const NotFound = () => {
  const router = useRouter();
  // The 404 page is prerendered once, so the requested path is known only in the browser.
  const [path, setPath] = useState("");
  useEffect(() => setPath(router.asPath.split(/[?#]/)[0]), [router.asPath]);

  return (
    <div className='not-found'>
      <p className='not-found__comment'>{"// error 404"}</p>
      <h1 className='not-found__title'>page not found</h1>
      <pre className='not-found__code'>
        <span className='blue'>const</span>
        <span className='green'> path</span>
        <span> = </span>
        <span className='orange'>{JSON.stringify(path)}</span>
        <span>;</span>
        {"\n"}
        <span className='grey'>{"// this file doesn't exist or has moved"}</span>
      </pre>
      <nav className='not-found__links' aria-label='Pages'>
        {LINKS.map((link) => (
          <Link key={link.href} href={link.href}>
            {"> "}
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default NotFound;
