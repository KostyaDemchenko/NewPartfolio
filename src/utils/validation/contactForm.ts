import { z } from "zod";

// Shared by the form and the API route, so the server never trusts the browser.
export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name should be at least 2 characters")
    .max(100, "Name is too long"),
  email: z
    .string()
    .trim()
    .max(200, "Email is too long")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "Enter a valid email, e.g. name@example.com"),
  message: z
    .string()
    .trim()
    .min(5, "Message should be at least 5 characters")
    .max(5000, "Message is too long (5000 characters max)"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
