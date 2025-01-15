import type { NextApiRequest, NextApiResponse } from "next";
import { sanityClient, urlFor } from "@/lib/sanity";

type TechnologyItem = {
  name: string;
  icon?: string;
};

type Project = {
  id: string;
  name: string;
  type: string;
  technologies: TechnologyItem[];
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

    // Base GROQ query for projects
    let query = `*[_type == "project"`;

    /**
     * If ?technologies=React,SCSS we want to show all projects that
     * contain ANY of those technology names in technologies[].name
     */
    if (technologies && typeof technologies === "string") {
      const techArray = technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter((tech) => tech.length > 0);

      if (techArray.length > 0) {
        // OR logic for each tech name: e.g. ("React" in technologies[].name) || ("SCSS" in technologies[].name)
        const techConditions = techArray
          .map((tech) => `"${tech}" in technologies[].name`)
          .join(" || ");
        query += ` && (${techConditions})`;
      }
    }

    // Return all fields, including the array of objects for `technologies`
    query += `]{
      id,
      name,
      type,
      technologies[]{
        name,
        icon
      },
      date,
      description,
      source,
      prev_url
    }`;

    // Fetch data from Sanity
    const projectsRaw = await sanityClient.fetch(query);
    console.log("Fetched Projects:", projectsRaw);

    const projects: Project[] = projectsRaw.map((project: any) => ({
      ...project,
      // Convert prev_url from image to actual URL string if present
      prev_url: project.prev_url ? urlFor(project.prev_url).url() : null,
    }));

    console.log("Processed Projects:", projects);

    return res.status(200).json({ projects });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return res.status(500).json({ error: "Failed to fetch projects" });
  }
}
