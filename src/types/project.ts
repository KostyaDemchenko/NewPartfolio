export interface Technology {
  /** Stable key used in URLs and filters, e.g. "nextjs". */
  slug: string;
  /** Display name, e.g. "Next.js". */
  name: string;
  /** Remix Icon class, e.g. "ri-nextjs-fill". */
  icon: string | null;
}

export interface Project {
  id: string;
  name: string;
  /** Raw type from the CMS, e.g. "_web-site". */
  type: string;
  /** ISO date (YYYY-MM-DD) used for sorting. */
  date: string;
  /** Human-readable date, e.g. "Mar 2022". */
  dateLabel: string;
  description: string;
  source: string | null;
  image: string | null;
  technologies: Technology[];
}
