// pages/api/technologies/index.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { sanityClient } from "@/lib/sanity";

type Data = {
  technologies?: string[];
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
    const query = `*[_type == "project"]{
      technologies
    }`;

    const projects = await sanityClient.fetch(query);

    const techSet = new Set<string>();
    projects.forEach((project: any) => {
      project.technologies.forEach((tech: string) => techSet.add(tech));
    });

    const technologies = Array.from(techSet).sort();

    res.status(200).json({ technologies });
  } catch (error) {
    console.error("Error fetching technologies:", error);
    res.status(500).json({ error: "Failed to fetch technologies" });
  }
}
