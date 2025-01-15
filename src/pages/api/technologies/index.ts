import type { NextApiRequest, NextApiResponse } from "next";
import { sanityClient } from "@/lib/sanity";

type TechnologyItem = {
  name: string;
  icon?: string;
};

type Data = {
  technologies?: TechnologyItem[];
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
    /**
     * 1. Query each project's "technologies" array:
     *    e.g. { name: "Next.Js", icon: "ri-nextjs-fill" } or sometimes null.
     */
    const query = `*[_type == "project"]{
      technologies[]{ name, icon }
    }`;

    const projects = await sanityClient.fetch(query);

    // 2. We'll store the name -> icon mapping in a Map so we can preserve each tech's name and icon
    const techMap = new Map<string, string | undefined>();

    projects.forEach((project: any) => {
      if (Array.isArray(project.technologies)) {
        project.technologies.forEach(
          (techItem: { name: string; icon?: string } | null) => {
            // If techItem is null or missing 'name', skip it
            if (!techItem || !techItem.name) {
              return;
            }
            // If we've never encountered this name, store its icon
            if (!techMap.has(techItem.name)) {
              techMap.set(techItem.name, techItem.icon);
            }
            // If you want to handle duplicates or overwriting, do so here
          }
        );
      }
    });

    // 3. Convert our Map to an array of objects: [{ name, icon }]
    //    Sort them by name for a consistent order
    const technologies = Array.from(techMap)
      .map(([techName, techIcon]) => ({
        name: techName,
        icon: techIcon,
      }))
      .sort((a, b) => a.name.localeCompare(b.name));

    // 4. Return an array of {name, icon} objects
    return res.status(200).json({ technologies });
  } catch (error) {
    console.error("Error fetching technologies:", error);
    return res.status(500).json({ error: "Failed to fetch technologies" });
  }
}
