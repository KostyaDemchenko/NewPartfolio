import React, { useState } from "react";
import { z } from "zod";
import "./style.scss";

const formSchema = z.object({
  name: z
    .string()
    .nonempty("Поле 'name' обязательно")
    .min(2, "Минимум 2 символа"),
  email: z
    .string()
    .trim()
    .regex(
      /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
      "Невалидный email (формат должен быть что-то@домен.хх)"
    ),
  message: z.string().min(5, "Сообщение должно содержать не менее 5 символов"),
});

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
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [serverMessage, setServerMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updated = { ...values, [name]: value };
    setValues(updated);
    onChange(updated);
  };
  // Отправка формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsedData = formSchema.parse(values);
      setErrors({});
      setStatus("loading");
      setServerMessage("");

      const response = await fetch("/api/send_mail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedData),
      });
      const resData = await response.json();

      if (response.ok) {
        setStatus("success");
        setServerMessage("Message sent successfully!");
        setValues({ name: "", email: "", message: "" });
        onChange({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setServerMessage(resData.msg || "Error sending");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<FormData> = {};
        error.issues.forEach((issue) => {
          const fieldName = issue.path[0] as keyof FormData;
          fieldErrors[fieldName] = issue.message;
        });
        setErrors(fieldErrors);
      } else {
        setStatus("error");
        setServerMessage("Error sending (js validation or network error).");
        console.error("Error sending:", error);
      }
    }
  };

  return (
    <div className='contact-from-container'>
      <form onSubmit={handleSubmit}>
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

        <button type='submit' disabled={status === "loading"}>
          {status === "loading" ? "Sending..." : "submit-message"}
        </button>
      </form>

      {status === "success" && (
        <p className='success-message'>{serverMessage}</p>
      )}
      {status === "error" && <p className='error-message'>{serverMessage}</p>}
    </div>
  );
}
