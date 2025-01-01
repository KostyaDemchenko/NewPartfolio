// src/components/ContactForm.tsx
import React, { useState } from "react";
import { z } from "zod";

import "./style.scss";

// Схема валидации через Zod
const formSchema = z.object({
  name: z
    .string()
    .nonempty("Поле 'name' обязательно")
    .min(2, "Минимум 2 символа"),
  email: z.string().email("Невалидный email"),
  message: z.string().min(5, "Сообщение должно содержать не менее 5 символов"),
});

// Тип на основе схемы Zod
type FormData = z.infer<typeof formSchema>;

interface ContactFormProps {
  onChange: (values: FormData) => void;
}

export default function ContactForm({ onChange }: ContactFormProps) {
  const [values, setValues] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  // Обновление стейта и информирование родителя о новых данных
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updated = { ...values, [name]: value };
    setValues(updated);
    onChange(updated);
  };

  // Обработка отправки формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Валидация введённых данных
      const parsedData = formSchema.parse(values);
      // Здесь подключается логика для отправки (например, через NodeMailer)
      console.log("Данные прошли валидацию:", parsedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.error("Ошибки валидации:", error.issues);
      }
    }
  };

  return (
    <div className='contact-from-container'>
      <form onSubmit={handleSubmit}>
        <div className='input-box'>
          <label htmlFor='name'>_name:</label>
          <input
            id='name'
            name='name'
            type='text'
            value={values.name}
            onChange={handleInputChange}
          />
        </div>

        <div className='input-box'>
          <label htmlFor='email'>_email:</label>
          <input
            id='email'
            name='email'
            type='email'
            value={values.email}
            onChange={handleInputChange}
          />
        </div>

        <div className='input-box'>
          <label htmlFor='message'>_message:</label>
          <textarea
            id='message'
            name='message'
            value={values.message}
            onChange={handleInputChange}
          />
        </div>

        <button type='submit'>submit-message</button>
      </form>
    </div>
  );
}
