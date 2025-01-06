// pages/api/projects/index.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { sanityClient, urlFor } from "@/lib/sanity";

type Project = {
  id: string;
  name: string;
  type: string;
  technologies: string[];
  date: string;
  description: string;
  source: string;
  prev_url: string | null;
};

type Data = {
  projects?: Project[];
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { technologies } = req.query;

    // Базовый GROQ-запрос с фильтрацией
    let query = `*[_type == "project"`;

    if (technologies && typeof technologies === "string") {
      const techArray = technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter((tech) => tech.length > 0);

      if (techArray.length > 0) {
        // Используем OR логику для фильтрации проектов, содержащих любую из технологий
        const techConditions = techArray
          .map((tech) => `"${tech}" in technologies`)
          .join(" || ");
        query += ` && (${techConditions})`;
      }
    }

    query += `]{
      id,
      name,
      type,
      technologies,
      date,
      description,
      source,
      prev_url
    }`;

    // Логирование запроса для отладки
    console.log("GROQ Query:", query);

    const projectsRaw = await sanityClient.fetch(query);

    // Временные консольные логи для отладки
    console.log("Fetched Projects:", projectsRaw);

    const projects: Project[] = projectsRaw.map((project: any) => ({
      ...project,
      prev_url: project.prev_url ? urlFor(project.prev_url).url() : null,
    }));

    // Временные консольные логи для отладки
    console.log("Processed Projects:", projects);

    res.status(200).json({ projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
}
