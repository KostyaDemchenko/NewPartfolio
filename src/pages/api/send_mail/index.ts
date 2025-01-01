import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

function getFormattedDate() {
  const dateObj = new Date();
  const weekday = dateObj.toLocaleString("ru-RU", { weekday: "short" }); // "ср"
  const day = dateObj.getDate(); // 1
  const month = dateObj.toLocaleString("ru-RU", { month: "long" }); // "января"
  const year = dateObj.getFullYear();
  const hour = String(dateObj.getHours()).padStart(2, "0");
  const minute = String(dateObj.getMinutes()).padStart(2, "0");
  return `${weekday}, ${day} ${month} ${year}, ${hour}:${minute}`;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, msg: "Method Not Allowed" });
  }

  try {
    const { name, email, message } = req.body;
    console.log("Got data:", { name, email, message });

    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
      console.error("Missing GMAIL_USER or GMAIL_PASS in env");
      return res
        .status(500)
        .json({ success: false, msg: "Server config error" });
    }

    const now = getFormattedDate();

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Form" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `Сообщение с сайта (от ${name})`,
      text: `
Сообщение с моего портфолио:

От: ${name}
Email: ${email}
Дата: ${now}

Текст сообщения:
${message}

---
Отправлено с моего сайта-портфолио
      `,
      // Обычный текст письма

      // HTML-версия для красивой верстки в письме
      html: `
        <div style="font-family: sans-serif; color: #333;">
          <h2>Сообщение с моего портфолио</h2>
          <p><strong>От:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Дата:</strong> ${now}</p>
          <p><strong>Текст сообщения:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
          <hr />
          <p style="font-size: 0.9rem; color: #777;">Отправлено с моего сайта-портфолио</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true, msg: "Message sent" });
  } catch (err) {
    console.error("Error in /api/send_mail:", err);
    return res.status(500).json({
      success: false,
      msg: "Internal Server Error",
      error: String(err),
    });
  }
}
