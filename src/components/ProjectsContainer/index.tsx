import { Skeleton, Box } from "@mui/material";
import SkeletonCard from "@/src/components/SkeletonCard";
import ProjectCard from "@/src/components/ProjectCard";

import { parseDate } from "@/src/utils/functions/parseDate";

import "./style.scss";

interface Project {
  id: string;
  name: string;
  type: string;
  technologies: string[];
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
  if (isLoading) {
    return (
      <div className='projects-container'>
        {[...Array(9)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  const sortedProjects = [...projects].sort((a, b) => {
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    return dateB - dateA;
  });

  return (
    <div className='projects-container'>
      {sortedProjects.map((project) => (
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
    </div>
  );
};

export default ProjectsContainer;
