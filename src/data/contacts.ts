export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://demchenko-kostiantyn-partfolio.vercel.app"
).replace(/\/$/, "");

export const CV_PDF_PATH = "/cv/Demchenko_Kostiantyn_Front-End_CV_EN.pdf";

export const CONTACTS = {
  email: "kostiantyn.demchenko.work@gmail.com",
  phone: { href: "tel:+380989122946", label: "+380 98 912 29 46" },
  telegram: { href: "https://t.me/jpeg_on", label: "@jpeg_on" },
  linkedin: "https://www.linkedin.com/in/kostiantyn-demchenko-14874224a/",
  github: "https://github.com/KostyaDemchenko",
} as const;
