import { sanityClient, urlFor } from "@/lib/sanity";
import type { Project, Technology } from "@/src/types/project";
import { technologyKey } from "@/src/utils/projectFilters";

interface RawTechnology {
  name?: string | null;
  icon?: string | null;
}

interface RawProject {
  _id: string;
  id?: string | null;
  name?: string | null;
  type?: string | null;
  date?: string | null;
  description?: string | null;
  source?: string | null;
  prev_url?: unknown;
  technologies?: (RawTechnology | null)[] | null;
}

const PROJECTS_QUERY = `*[_type == "project"]{
  _id,
  id,
  name,
  type,
  date,
  description,
  source,
  prev_url,
  technologies[]{ name, icon }
}`;

// The CMS stores technologies as free text, so the same tool shows up as
// "Html"/"HTML" or "Next.Js"/"Next.js". Group them by a loose key and give
// every group one canonical name.
const CANONICAL_NAMES: Record<string, string> = {
  html: "HTML",
  html5: "HTML",
  css: "CSS",
  css3: "CSS",
  scss: "SCSS",
  sass: "SCSS",
  javascript: "JavaScript",
  js: "JavaScript",
  typescript: "TypeScript",
  ts: "TypeScript",
  react: "React",
  reactjs: "React",
  nextjs: "Next.js",
  next: "Next.js",
  vue: "Vue",
  vuejs: "Vue",
  vue3: "Vue",
  jquery: "jQuery",
  redux: "Redux",
  redax: "Redux",
  mariadb: "MariaDB",
  mysql: "MySQL",
  sql: "SQL",
  php: "PHP",
  tailwind: "Tailwind CSS",
  tailwindcss: "Tailwind CSS",
  bootstrap: "Bootstrap",
  bootstrap5: "Bootstrap",
  websocket: "WebSockets",
  websockets: "WebSockets",
  i18n: "i18n",
  graphql: "GraphQL",
  nodejs: "Node.js",
  node: "Node.js",
  express: "Express",
  expressjs: "Express",
};

function normalizeTechnology(raw: RawTechnology | null): Technology | null {
  const name = raw?.name?.trim();
  if (!name) return null;
  const slug = technologyKey(name);
  if (!slug) return null;
  return {
    slug,
    name: CANONICAL_NAMES[slug] ?? name,
    icon: raw?.icon?.trim() || null,
  };
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/** Accepts "DD.MM.YYYY" (current CMS format) or ISO "YYYY-MM-DD". */
export function parseProjectDate(value: string | null | undefined) {
  const text = value?.trim() ?? "";
  let year: number, month: number, day: number;

  const dotted = text.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
  const iso = text.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (dotted) {
    [day, month, year] = [Number(dotted[1]), Number(dotted[2]), Number(dotted[3])];
  } else if (iso) {
    [year, month, day] = [Number(iso[1]), Number(iso[2]), Number(iso[3])];
  } else {
    return { date: "", dateLabel: text };
  }

  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    date: `${year}-${pad(month)}-${pad(day)}`,
    dateLabel: `${MONTHS[month - 1] ?? ""} ${year}`.trim(),
  };
}

function imageUrl(source: unknown): string | null {
  if (!source) return null;
  try {
    return urlFor(source as Parameters<typeof urlFor>[0])
      .width(1000)
      .fit("max")
      .auto("format")
      .quality(80)
      .url();
  } catch {
    return null;
  }
}

function normalizeProject(raw: RawProject): Project {
  const seen = new Set<string>();
  const technologies: Technology[] = [];
  for (const item of raw.technologies ?? []) {
    const tech = normalizeTechnology(item);
    if (tech && !seen.has(tech.slug)) {
      seen.add(tech.slug);
      technologies.push(tech);
    }
  }

  return {
    id: raw._id,
    name: raw.name?.trim() || "Untitled project",
    type: raw.type?.trim() || "",
    ...parseProjectDate(raw.date),
    description: raw.description?.trim() || "",
    source: raw.source?.trim() || null,
    image: imageUrl(raw.prev_url),
    technologies,
  };
}

/** All published projects, newest first. */
export async function getProjects(): Promise<Project[]> {
  const raw = await sanityClient.fetch<RawProject[]>(PROJECTS_QUERY);
  return raw
    .map(normalizeProject)
    .sort((a, b) => b.date.localeCompare(a.date) || a.name.localeCompare(b.name));
}
