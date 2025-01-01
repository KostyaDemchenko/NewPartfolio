// src/components/RealTimePreview.tsx
import React from "react";

import "./style.scss";

interface RealTimePreviewProps {
  name: string;
  email: string;
  message: string;
}

export default function RealTimePreview({
  name,
  email,
  message,
}: RealTimePreviewProps) {
  return (
    <div className='real-time-preview-container'>
      <h2>Просмотр введённых данных</h2>
      <p>
        <strong>Имя:</strong> {name}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Сообщение:</strong> {message}
      </p>
    </div>
  );
}
