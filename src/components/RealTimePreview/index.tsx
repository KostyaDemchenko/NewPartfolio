import React, { useEffect, useState } from "react";
import "./style.scss";

interface RealTimePreviewProps {
  name: string;
  email: string;
  message: string;
}

/** "Thu 21 Apr" in the visitor's local time. */
function formatToday() {
  const now = new Date();
  const weekday = now.toLocaleString("en-US", { weekday: "short" });
  const month = now.toLocaleString("en-US", { month: "short" });
  return `${weekday} ${now.getDate()} ${month}`;
}

type TokenKind = "kw" | "id" | "fn" | "prop" | "str" | "punct";
type Token = [TokenKind, string];

const kw = (text: string): Token => ["kw", text];
const id = (text: string): Token => ["id", text];
const fn = (text: string): Token => ["fn", text];
const prop = (text: string): Token => ["prop", text];
const str = (text: string): Token => ["str", JSON.stringify(text)];
const p = (text: string): Token => ["punct", text];

export default function RealTimePreview({ name, email, message }: RealTimePreviewProps) {
  // The page is prerendered at build time, so the date is filled in only after
  // hydration; rendering it on the server made React report a text mismatch.
  const [today, setToday] = useState("");
  useEffect(() => setToday(formatToday()), []);

  const lines: Token[][] = [
    [kw("const"), p(" "), id("button"), p(" = "), id("document"), p("."), fn("querySelector"), p("("), ["str", "'#sendBtn'"], p(");")],
    [],
    [kw("const"), p(" "), id("message"), p(" = {")],
    [p("  "), prop("name"), p(": "), str(name), p(",")],
    [p("  "), prop("email"), p(": "), str(email), p(",")],
    [p("  "), prop("message"), p(": "), str(message), p(",")],
    [p("  "), prop("date"), p(": "), str(today)],
    [p("}")],
    [],
    [id("button"), p("."), fn("addEventListener"), p("("), ["str", "'click'"], p(", () "), kw("=>"), p(" {")],
    [p("  "), id("form"), p("."), fn("send"), p("("), id("message"), p(");")],
    [p("})")],
  ];

  return (
    <div className='real-time-preview-container' aria-hidden='true'>
      <div className='code-box'>
        <pre>
          {lines.map((tokens, index) => (
            <div className='line' key={index}>
              <span className='line-number'>{index + 1}</span>
              <span className='code-content'>
                {tokens.map(([kind, text], i) => (
                  <span key={i} className={`tok-${kind}`}>
                    {text}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
