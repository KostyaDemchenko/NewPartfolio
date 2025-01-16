import React, { useState } from "react";
import SkeletonCard from "@/src/components/SkeletonCard";
import ProjectCard from "@/src/components/ProjectCard";

import { parseDate } from "@/src/utils/functions/parseDate";

import "./style.scss";

interface TechnologyItem {
  name: string;
  icon?: string;
}

interface Project {
  id: string;
  name: string;
  type: string;
  technologies: TechnologyItem[];
  date: string;
  description: string;
  source: string;
  prev_url: string | null;
}

interface ProjectsContainerProps {
  projects: Project[];
  isLoading: boolean;
}

const ProjectsContainer: React.FC<ProjectsContainerProps> = ({
  projects,
  isLoading,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const projectsPerPage = 9;

  // Calculate total pages
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  // Get current projects for the page
  const sortedProjects = [...projects].sort((a, b) => {
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    return dateB - dateA;
  });

  const currentProjects = sortedProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className='projects-container'>
        {[...Array(9)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className='projects-container'>
      {currentProjects.map((project) => (
        <ProjectCard
          key={project.id}
          id={project.id}
          name={project.name}
          type={project.type}
          image={project.prev_url || "/default-image.jpg"}
          description={project.description}
          date={project.date}
          technologies={project.technologies}
          link={project.source}
        />
      ))}
      {/* Пагинация */}
      {totalPages > 1 && (
        <div className='pagination'>
          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                className={`pagination-button ${
                  page === currentPage ? "active" : ""
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProjectsContainer;
