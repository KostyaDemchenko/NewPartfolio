// pages/projects.tsx
// this page is only for test need to rewrite this whole page

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

type Project = {
  id: string;
  name: string;
  type: string;
  technologies: string[];
  date: string;
  description: string;
  source: string;
  prev_url: string;
};

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("/api/projects");
        setProjects(res.data.projects);
        setFilteredProjects(res.data.projects);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects");
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Получаем все уникальные технологии
  const allTechnologies = Array.from(
    new Set(projects.flatMap((project) => project.technologies))
  );

  // Обработчик фильтрации
  const handleFilterChange = (tech: string) => {
    let updatedSelection = [...selectedTech];
    if (updatedSelection.includes(tech)) {
      updatedSelection = updatedSelection.filter((t) => t !== tech);
    } else {
      updatedSelection.push(tech);
    }
    setSelectedTech(updatedSelection);

    if (updatedSelection.length === 0) {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter((project) =>
          updatedSelection.every((tech) => project.technologies.includes(tech))
        )
      );
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='projects-page'>
      <h1>My Projects</h1>

      <div className='filters'>
        <h2>Filter by Technologies:</h2>
        <div className='tech-list'>
          {allTechnologies.map((tech) => (
            <label key={tech}>
              <input
                type='checkbox'
                value={tech}
                checked={selectedTech.includes(tech)}
                onChange={() => handleFilterChange(tech)}
              />
              {tech}
            </label>
          ))}
        </div>
      </div>

      <div className='projects-list'>
        {filteredProjects.map((project) => (
          <div key={project.id} className='project-card'>
            <Image
              src={project.prev_url}
              alt={`${project.name} preview`}
              width={600}
              height={400}
              layout='responsive'
              objectFit='cover'
            />
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <p>
              <strong>Type:</strong> {project.type}
            </p>
            <p>
              <strong>Technologies:</strong> {project.technologies.join(", ")}
            </p>
            <p>
              <strong>Date:</strong> {project.date}
            </p>
            <a href={project.source} target='_blank' rel='noopener noreferrer'>
              View Project
            </a>
          </div>
        ))}
      </div>

      <style jsx>{`
        .projects-page {
          padding: 2rem;
          background-color: #000;
          color: #fff;
        }
        .filters {
          margin-bottom: 2rem;
        }
        .tech-list label {
          margin-right: 1rem;
          cursor: pointer;
        }
        .projects-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }
        .project-card {
          background-color: #1e1e1e;
          padding: 1rem;
          border: 1px solid #333;
          border-radius: 8px;
          transition: transform 0.2s;
        }
        .project-card:hover {
          transform: scale(1.05);
        }
        .project-card h3 {
          margin-top: 1rem;
        }
        .project-card a {
          display: inline-block;
          margin-top: 1rem;
          padding: 0.5rem 1rem;
          background-color: #28a745;
          color: #fff;
          border-radius: 4px;
          text-decoration: none;
          transition: background-color 0.2s;
        }
        .project-card a:hover {
          background-color: #218838;
        }
      `}</style>
    </div>
  );
};

export default ProjectsPage;
