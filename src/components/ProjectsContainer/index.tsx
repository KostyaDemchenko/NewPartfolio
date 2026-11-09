import React, { useRef, useState } from "react";
import ProjectCard from "@/src/components/ProjectCard";
import type { Project } from "@/src/types/project";

import "./style.scss";

interface ProjectsContainerProps {
  projects: Project[];
  highlightedTech?: string[];
  onClearFilters?: () => void;
}

const PROJECTS_PER_PAGE = 9;

const ProjectsContainer: React.FC<ProjectsContainerProps> = ({
  projects,
  highlightedTech = [],
  onClearFilters,
}) => {
  // The parent remounts this component when filters change, so the page resets to 1.
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);
  const page = Math.min(currentPage, Math.max(totalPages, 1));
  const currentProjects = projects.slice(
    (page - 1) * PROJECTS_PER_PAGE,
    page * PROJECTS_PER_PAGE
  );

  const goToPage = (next: number) => {
    setCurrentPage(next);
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (projects.length === 0) {
    return (
      <div className='projects-container empty'>
        <p className='no-projects'>// no projects match these filters</p>
        {onClearFilters && (
          <button type='button' className='no-projects-clear' onClick={onClearFilters}>
            _clear-filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className='projects-container' ref={containerRef}>
      {currentProjects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          highlightedTech={highlightedTech}
        />
      ))}
      {totalPages > 1 && (
        <nav className='pagination' aria-label='Projects pages'>
          {Array.from({ length: totalPages }, (_, index) => {
            const number = index + 1;
            return (
              <button
                key={number}
                type='button'
                className={`pagination-button ${number === page ? "active" : ""}`}
                aria-current={number === page ? "page" : undefined}
                onClick={() => goToPage(number)}
              >
                {number}
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
};

export default ProjectsContainer;
