import type { Project, Technology } from "@/src/types/project";

export interface FilterState {
  /** Technology slugs; a project must use every selected technology. */
  tech: string[];
  /** Project types; a project must match any selected type. */
  types: string[];
}

export interface FilterOption {
  value: string;
  label: string;
  icon: string | null;
  /** How many projects would be shown if this option were (or stays) selected. */
  count: number;
  selected: boolean;
}

export const EMPTY_FILTERS: FilterState = { tech: [], types: [] };

export function technologyKey(name: string): string {
  return name
    .toLowerCase()
    .replace(/\.js\b/g, "js")
    .replace(/[^a-z0-9+#]/g, "");
}

export function typeLabel(type: string): string {
  return type.replace(/^_+/, "").replace(/[-_]+/g, " ").trim() || "other";
}

const usesAll = (project: Project, tech: string[]) =>
  tech.every((slug) => project.technologies.some((t) => t.slug === slug));

const hasType = (project: Project, types: string[]) =>
  types.length === 0 || types.includes(project.type);

export function filterProjects(projects: Project[], filters: FilterState) {
  return projects.filter(
    (p) => hasType(p, filters.types) && usesAll(p, filters.tech)
  );
}

export function technologyOptions(
  projects: Project[],
  filters: FilterState
): FilterOption[] {
  const all = new Map<string, Technology & { total: number }>();
  for (const project of projects) {
    for (const tech of project.technologies) {
      const entry = all.get(tech.slug);
      if (entry) {
        entry.total += 1;
        entry.icon ??= tech.icon;
      } else {
        all.set(tech.slug, { ...tech, total: 1 });
      }
    }
  }

  const inTypes = projects.filter((p) => hasType(p, filters.types));
  return Array.from(all.values())
    .map((tech) => {
      const selected = filters.tech.includes(tech.slug);
      const wanted = selected ? filters.tech : [...filters.tech, tech.slug];
      return {
        value: tech.slug,
        label: tech.name,
        icon: tech.icon,
        count: inTypes.filter((p) => usesAll(p, wanted)).length,
        selected,
        total: tech.total,
      };
    })
    .sort((a, b) => b.total - a.total || a.label.localeCompare(b.label))
    .map(({ total: _total, ...option }) => option);
}

export function typeOptions(
  projects: Project[],
  filters: FilterState
): FilterOption[] {
  const types = Array.from(new Set(projects.map((p) => p.type))).filter(Boolean);
  const withTech = projects.filter((p) => usesAll(p, filters.tech));
  return types
    .map((type) => ({
      value: type,
      label: typeLabel(type),
      icon: null,
      count: withTech.filter((p) => p.type === type).length,
      selected: filters.types.includes(type),
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

const splitParam = (value: string | string[] | undefined) =>
  (Array.isArray(value) ? value.join(",") : value ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

/** Reads filters from the URL; also understands the old ?technologies=Next.Js,React links. */
export function filtersFromQuery(
  query: Record<string, string | string[] | undefined>,
  projects: Project[]
): FilterState {
  const knownTech = new Set(projects.flatMap((p) => p.technologies.map((t) => t.slug)));
  const knownTypes = new Set(projects.map((p) => p.type));

  const tech = [...splitParam(query.tech), ...splitParam(query.technologies)]
    .map(technologyKey)
    .filter((slug, i, list) => knownTech.has(slug) && list.indexOf(slug) === i);

  const types = splitParam(query.type)
    .map((value) => (value.startsWith("_") ? value : `_${value}`))
    .filter((type, i, list) => knownTypes.has(type) && list.indexOf(type) === i);

  return { tech, types };
}

export function filtersToQuery(filters: FilterState): Record<string, string> {
  const query: Record<string, string> = {};
  if (filters.tech.length) query.tech = filters.tech.join(",");
  if (filters.types.length) {
    query.type = filters.types.map((t) => t.replace(/^_+/, "")).join(",");
  }
  return query;
}
