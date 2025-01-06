import React from "react";
import { Skeleton, Box } from "@mui/material";
import "./style.scss";

interface Project {
  id: string;
  name: string;
  technologies: string[];
  // другие поля проекта
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
    // Рендерим скелетон с использованием MUI Skeleton
    return (
      <div className='projects-container'>
        {[...Array(6)].map((_, index) => (
          <Box key={index} className='skeleton-card'>
            <Skeleton
              variant='rounded'
              animation='wave'
              sx={{
                bgcolor: "var(--color-primary-blue)",
                height: 30,
                width: "70%",
                marginBottom: 1,
                borderRadius: 2,
              }}
            />
            <Skeleton
              variant='rounded'
              animation='wave'
              sx={{
                bgcolor: "var(--color-primary-blue)",
                height: 20,
                width: "50%",
                borderRadius: 2,
              }}
            />
          </Box>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <p className='no-projects'>
        Нет проектов, соответствующих выбранным фильтрам.
      </p>
    );
  }

  return (
    <div className='projects-container'>
      {projects.map((project) => (
        <div key={project.id} className='project-card'>
          <h3>{project.name}</h3>
          <div className='technologies'>
            {project.technologies.map((tech) => (
              <span key={tech} className='tech-tag'>
                {tech}
              </span>
            ))}
          </div>
          {/* Добавьте другие детали проекта по необходимости */}
        </div>
      ))}
      <Box className='skeleton-card'>
        <Skeleton
          variant='rounded'
          animation='wave'
          sx={{
            bgcolor: "var(--color-primary-blue)",
            height: 30,
            width: "70%",
            marginBottom: 1,
            borderRadius: 2,
          }}
        />
        <Skeleton
          variant='rounded'
          animation='wave'
          sx={{
            bgcolor: "var(--color-primary-blue)",
            height: 20,
            width: "50%",
            borderRadius: 2,
          }}
        />
      </Box>
    </div>
  );
};

export default ProjectsContainer;
