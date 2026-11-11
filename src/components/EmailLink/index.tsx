import { useEffect, useRef, useState } from "react";
import { CONTACTS } from "@/src/data/contacts";
import "./style.scss";

const COPIED_MS = 1600;

/**
 * The email row of the sidebars. The address doesn't fit the column, so besides
 * the mailto link there is a copy button that swaps the row to a short notice.
 */
const EmailLink = () => {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>();

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACTS.email);
    } catch {
      return; // no clipboard access (old browser or blocked): the mailto link still works
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), COPIED_MS);
  };

  return (
    <div className={`email-link ${copied ? "copied" : ""}`}>
      <a href={`mailto:${CONTACTS.email}`} title={CONTACTS.email}>
        <i className='ri-mail-fill' aria-hidden='true'></i>
        {copied ? "// copied to clipboard" : CONTACTS.email}
      </a>
      <button type='button' className='email-copy' onClick={copy} title='Copy email' aria-label='Copy email address'>
        <i className={copied ? "ri-check-line" : "ri-file-copy-line"} aria-hidden='true'></i>
      </button>
      <span className='sr-only' role='status'>
        {copied ? "Email address copied" : ""}
      </span>
    </div>
  );
};

export default EmailLink;
