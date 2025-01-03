// lib/sanity.ts

import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const sanityClientConfig = {
  projectId: process.env.SANITY_PROJECT_ID as string, // Обязательно укажи строку
  dataset: process.env.SANITY_DATASET || "production",
  apiVersion: process.env.SANITY_API_VERSION || "2023-10-01", // Укажи актуальную версию API
  useCdn: process.env.NODE_ENV === "production", // Используй CDN в продакшене
  token: process.env.SANITY_API_TOKEN, // Используй переменную без
};

// Временные консольные логи для отладки
console.log("Sanity Client Config:", sanityClientConfig);

export const sanityClient = createClient(sanityClientConfig);

// Функция для построения URL изображений
const builder = imageUrlBuilder(sanityClient);
export function urlFor(source: any) {
  return builder.image(source);
}
