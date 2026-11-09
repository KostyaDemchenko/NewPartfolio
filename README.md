# Kostiantyn Demchenko — portfolio

Personal portfolio: about page with a snake game, experience (mirrors the PDF CV),
projects with filters, and a contact form.

Live: https://demchenko-kostiantyn-partfolio.vercel.app

## Stack

- Next.js 14 (Pages Router) + TypeScript + SCSS
- Projects come from Sanity (studio: https://crm-new-partfolio.vercel.app).
  The `/projects` page is generated statically and revalidated every 60 s (ISR),
  so CMS edits show up within a minute without a redeploy.
- Contact form: Nodemailer over Gmail, validated with Zod on both sides.
- Icons: [Remix Icon](https://remixicon.com/)
- Design: [Figma](https://www.figma.com/design/bg3L5cZH69pXALcpEolamy/Portfolio?node-id=64-1355&t=SDzCYt2hKVRH9LGE-1)

## Environment

| Variable | Needed for | Default |
| --- | --- | --- |
| `GMAIL_USER`, `GMAIL_PASS` | contact form (Gmail app password) | — |
| `SANITY_PROJECT_ID` | projects | `b8kuna3f` |
| `SANITY_DATASET` | projects | `production` |
| `NEXT_PUBLIC_SITE_URL` | canonical / Open Graph URLs | the Vercel URL |

The Sanity dataset is public, so no API token is needed to read projects.

## Scripts

```bash
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Content

- Experience page: `src/data/cv.ts` (keep in sync with the PDF in `public/cv/`).
- Contacts: `src/data/contacts.ts`.
- Projects: edit them in the Sanity studio.
