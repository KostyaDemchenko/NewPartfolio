import React, { useState, useEffect } from "react";
import HeadComponent from "@/src/components/Head";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import Accordion from "@/src/components/Accordion";
import FilterList from "@/src/components/FilterList";
import ProjectsContainer from "@/src/components/ProjectsContainer";

import "@/src/app/global.scss";
import "./style.scss";
import { useRouter } from "next/router";

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

export default function Projects() {
  const [allTechnologies, setAllTechnologies] = useState<TechnologyItem[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { query } = router;

  // 1. Fetch the list of technologies with { name, icon }
  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const response = await fetch("/api/technologies");
        const data = await response.json();

        if (response.ok) {
          // Проверяем, чтобы данные пришли в правильном формате
          if (Array.isArray(data.technologies)) {
            setAllTechnologies(data.technologies); // Уже массив { name, icon }
          } else {
            setError("Некорректный формат данных с API.");
          }
        } else {
          console.error("API Error:", data.error);
          setError(data.error);
        }
      } catch (error) {
        console.error("Ошибка при загрузке технологий:", error);
        setError("Произошла ошибка при загрузке технологий.");
      }
    };

    fetchTechnologies();
  }, []);

  // 2. Initialize selected filters from URL (?technologies=React,SCSS, etc.)
  useEffect(() => {
    const initialFilters = query.technologies
      ? Array.isArray(query.technologies)
        ? (query.technologies as string[])
        : (query.technologies as string).split(",").filter((tech) => tech)
      : [];
    setSelectedFilters(initialFilters);
  }, [query.technologies]);

  // 3. Fetch filtered projects whenever selectedFilters changes
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (selectedFilters.length > 0) {
          params.append("technologies", selectedFilters.join(","));
        }

        const fetchUrl = `/api/projects?${params.toString()}`;

        const response = await fetch(fetchUrl);
        const data = await response.json();

        if (response.ok) {
          setFilteredProjects(data.projects || []);
        } else {
          console.error("API Error:", data.error);
          setError(data.error);
        }
      } catch (error) {
        console.error("Ошибка при загрузке проектов:", error);
        setError("Произошла ошибка при загрузке проектов.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [selectedFilters]);

  // 4. Handler for when filters change
  const handleFilterChange = (filters: string[]) => {
    setSelectedFilters(filters);

    const nextQuery =
      filters.length > 0 ? { technologies: filters.join(",") } : {};

    router.push(
      {
        pathname: "/projects",
        query: nextQuery,
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <div className='hero'>
      <HeadComponent
        pageTitle='Projects'
        pageDescription='Personal portfolio Kostiantyn Demchenko / Projects'
      />
      <section className='main-container'>
        <Header />
        <main className='hero-main'>
          <div className='accordion-container'>
            <Accordion title='filters' show>
              <FilterList
                technologies={allTechnologies} // TechnologyItem[]
                onFilterChange={handleFilterChange}
                selectedFilters={selectedFilters}
                isLoading={isLoading}
              />
            </Accordion>
          </div>
          {error && <p className='error-message'>{error}</p>}
          <ProjectsContainer
            projects={filteredProjects}
            isLoading={isLoading}
          />
        </main>
        <Footer />
      </section>
    </div>
  );
}
