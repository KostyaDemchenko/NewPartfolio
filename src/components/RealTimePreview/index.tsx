// src/components/RealTimePreview.tsx
import React from "react";
import "./style.scss";

interface RealTimePreviewProps {
  name: string;
  email: string;
  message: string;
}

// Функция для формирования даты в стиле "Thu 21 Apr"
function getFormattedDate() {
  const dateObj = new Date();
  const weekday = dateObj.toLocaleString("en-US", { weekday: "short" }); // "Thu"
  const day = dateObj.getDate(); // 21
  const month = dateObj.toLocaleString("en-US", { month: "short" }); // "Apr"
  return `${weekday} ${day} ${month}`;
}

export default function RealTimePreview({
  name,
  email,
  message,
}: RealTimePreviewProps) {
  const today = getFormattedDate();

  const codeSnippet = `const button = document.querySelector('#sendBtn');

const message = {
  name: "${name}",
  email: "${email}",
  message: "${message}",
  date: "${today}"
}

button.addEventListener('click', () => {
  form.send(message);
})`;

  const lines = codeSnippet.split("\n");

  return (
    <div className='real-time-preview-container'>
      <div className='code-box'>
        <pre>
          {lines.map((line, index) => (
            <div className='line' key={index}>
              <span className='line-number'>{index + 1}</span>
              <span className='code-content'>{line}</span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
