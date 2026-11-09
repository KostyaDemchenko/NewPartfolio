import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { contactFormSchema } from "@/src/utils/validation/contactForm";

type Data = { success: boolean; msg: string };

function getFormattedDate() {
  return new Date().toLocaleString("ru-RU", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Kyiv",
  });
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

// Header values must stay on one line.
const singleLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, msg: "Method Not Allowed" });
  }

  const parsed = contactFormSchema.safeParse(req.body);
  if (!parsed.success) {
    const msg = parsed.error.issues[0]?.message ?? "Invalid form data";
    return res.status(400).json({ success: false, msg });
  }

  const { GMAIL_USER, GMAIL_PASS } = process.env;
  if (!GMAIL_USER || !GMAIL_PASS) {
    console.error("send_mail: GMAIL_USER or GMAIL_PASS is not set");
    return res.status(500).json({ success: false, msg: "Server config error" });
  }

  const { name, email, message } = parsed.data;
  const now = getFormattedDate();

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: { user: GMAIL_USER, pass: GMAIL_PASS },
    });

    await transporter.sendMail({
      from: `"Portfolio Form" <${GMAIL_USER}>`,
      to: GMAIL_USER,
      replyTo: { name: singleLine(name), address: email },
      subject: `Сообщение с сайта (от ${singleLine(name)})`,
      text: [
        "Сообщение с моего портфолио:",
        "",
        `От: ${name}`,
        `Email: ${email}`,
        `Дата: ${now}`,
        "",
        "Текст сообщения:",
        message,
        "",
        "---",
        "Отправлено с моего сайта-портфолио",
      ].join("\n"),
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2>Сообщение с моего портфолио</h2>
          <p><strong>От:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Дата:</strong> ${escapeHtml(now)}</p>
          <p><strong>Текст сообщения:</strong></p>
          <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
          <hr />
          <p style="font-size: 0.9rem; color: #777;">Отправлено с моего сайта-портфолио</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true, msg: "Message sent" });
  } catch (err) {
    console.error("send_mail: failed to send", err);
    return res.status(500).json({
      success: false,
      msg: "Could not send the message. Please try again later.",
    });
  }
}
