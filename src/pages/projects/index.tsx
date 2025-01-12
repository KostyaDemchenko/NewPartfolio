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

export default function Projects() {
  const [allTechnologies, setAllTechnologies] = useState<string[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { query } = router;

  // 1. Получение полного списка технологий при загрузке страницы
  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const response = await fetch("/api/technologies");
        const data = await response.json();
        if (response.ok) {
          setAllTechnologies(data.technologies || []);
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

  // 2. Инициализация выбранных фильтров из URL
  useEffect(() => {
    const initialFilters = query.technologies
      ? Array.isArray(query.technologies)
        ? (query.technologies as string[])
        : (query.technologies as string).split(",").filter((tech) => tech)
      : [];
    setSelectedFilters(initialFilters);
  }, [query.technologies]);

  // 3. Получение отфильтрованных проектов при изменении фильтров
  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Формируем URL с параметрами фильтрации
        const params = new URLSearchParams();
        if (selectedFilters.length > 0) {
          params.append("technologies", selectedFilters.join(","));
        }

        const fetchUrl = `/api/projects?${params.toString()}`;

        console.log("Fetching Projects with URL:", fetchUrl);

        const response = await fetch(fetchUrl);
        const data = await response.json();

        if (response.ok) {
          setFilteredProjects(data.projects || []);
        } else {
          console.error("API Error:", data.error);
          setError(data.error);
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Ошибка при загрузке проектов:", error);
        setError("Произошла ошибка при загрузке проектов.");
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [selectedFilters]);

  // 4. Обработчик изменения фильтров
  const handleFilterChange = (filters: string[]) => {
    setSelectedFilters(filters);

    // Обновляем URL без перезагрузки страницы, используя одну строку технологий, разделённую запятыми
    const query = filters.length > 0 ? { technologies: filters.join(",") } : {};

    router.push(
      {
        pathname: "/projects",
        query: query,
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
                technologies={allTechnologies}
                onFilterChange={handleFilterChange}
                selectedFilters={selectedFilters}
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
