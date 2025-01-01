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
  // Улучшенная валидация email:
  email: z
    .string()
    .trim()
    .regex(
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
      "Невалидный email (формат должен быть что-то@домен.хх)"
    ),
  message: z.string().min(5, "Сообщение должно содержать не менее 5 символов"),
});

// Тип на основе схемы Zod
type FormData = z.infer<typeof formSchema>;

interface ContactFormProps {
  onChange: (values: FormData) => void;
}

export default function ContactForm({ onChange }: ContactFormProps) {
  // Данные формы
  const [values, setValues] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  // Ошибки для каждого поля
  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Обновление полей
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updated = { ...values, [name]: value };
    setValues(updated);
    onChange(updated);
  };

  // Отправка формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Валидация введённых данных
      const parsedData = formSchema.parse(values);

      // Если нет ошибок — очищаем состояние ошибок
      setErrors({});
      // Логика отправки через NodeMailer или fetch на API
      console.log("Данные прошли валидацию:", parsedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Собираем ошибки в объект
        const fieldErrors: Partial<FormData> = {};
        error.issues.forEach((issue) => {
          // issue.path[0] содержит имя поля
          const fieldName = issue.path[0] as keyof FormData;
          fieldErrors[fieldName] = issue.message;
        });
        setErrors(fieldErrors);
        console.error("Ошибки валидации:", fieldErrors);
      }
    }
  };

  return (
    <div className='contact-from-container'>
      <form onSubmit={handleSubmit}>
        {/* ПОЛЕ name */}
        <div className='input-box'>
          <label htmlFor='name' className='input-label'>
            _name:
          </label>
          <input
            id='name'
            name='name'
            type='text'
            value={values.name}
            onChange={handleInputChange}
            className={errors.name ? "error" : ""}
          />
          {errors.name && <span className='error-message'>{errors.name}</span>}
        </div>

        {/* ПОЛЕ email */}
        <div className='input-box'>
          <label htmlFor='email' className='input-label'>
            _email:
          </label>
          <input
            id='email'
            name='email'
            type='email'
            value={values.email}
            onChange={handleInputChange}
            className={errors.email ? "error" : ""}
          />
          {errors.email && (
            <span className='error-message'>{errors.email}</span>
          )}
        </div>

        {/* ПОЛЕ message */}
        <div className='input-box'>
          <label htmlFor='message' className='input-label'>
            _message:
          </label>
          <textarea
            id='message'
            name='message'
            value={values.message}
            onChange={handleInputChange}
            className={errors.message ? "error" : ""}
          />
          {errors.message && (
            <span className='error-message'>{errors.message}</span>
          )}
        </div>

        <button type='submit'>submit-message</button>
      </form>
    </div>
  );
}
