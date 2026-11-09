import { useCallback, useEffect, useMemo, useState } from "react";
import type { GetStaticProps } from "next";
import { useRouter } from "next/router";

import HeadComponent from "@/src/components/Head";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import Accordion from "@/src/components/Accordion";
import FilterList from "@/src/components/FilterList";
import ProjectsContainer from "@/src/components/ProjectsContainer";

import { getProjects } from "@/lib/projects";
import type { Project } from "@/src/types/project";
import {
  EMPTY_FILTERS,
  FilterState,
  filterProjects,
  filtersFromQuery,
  filtersToQuery,
  technologyOptions,
  typeOptions,
} from "@/src/utils/projectFilters";

import "./style.scss";

interface ProjectsPageProps {
  projects: Project[];
}

// Projects are rendered at build time and refreshed from the CMS at most
// once a minute, so the page never depends on a live API call in the browser.
export const getStaticProps: GetStaticProps<ProjectsPageProps> = async () => {
  const projects = await getProjects();
  return { props: { projects }, revalidate: 60 };
};

const toggle = (list: string[], value: string) =>
  list.includes(value) ? list.filter((item) => item !== value) : [...list, value];

export default function Projects({ projects }: ProjectsPageProps) {
  const router = useRouter();

  // Filters live in the URL so a filtered view can be shared. They are read
  // from asPath after mount: router.query stays empty on statically generated
  // pages until Next finishes its post-hydration update, which can lag.
  const [filters, setFilterState] = useState<FilterState>(EMPTY_FILTERS);

  useEffect(() => {
    const search = router.asPath.split("?")[1]?.split("#")[0] ?? "";
    setFilterState(filtersFromQuery(Object.fromEntries(new URLSearchParams(search)), projects));
  }, [router.asPath, projects]);

  const setFilters = useCallback(
    (next: FilterState) => {
      setFilterState(next);
      router.replace(
        { pathname: router.pathname, query: filtersToQuery(next) },
        undefined,
        { shallow: true, scroll: false }
      );
    },
    [router]
  );

  const visibleProjects = useMemo(
    () => filterProjects(projects, filters),
    [projects, filters]
  );
  const techOptions = useMemo(
    () => technologyOptions(projects, filters),
    [projects, filters]
  );
  const projectTypes = useMemo(
    () => typeOptions(projects, filters),
    [projects, filters]
  );

  const hasFilters = filters.tech.length > 0 || filters.types.length > 0;
  const clearFilters = () => setFilters(EMPTY_FILTERS);

  return (
    <div className='hero'>
      <HeadComponent
        pageTitle='Projects'
        pageDescription='Projects by Kostiantyn Demchenko, Front-End Developer: web apps, websites and Telegram mini apps built with Next.js, React, Vue and TypeScript.'
        path='/projects'
      />
      <section className='main-container'>
        <Header />
        <main className='hero-main'>
          <div className='accordion-container'>
            <Accordion title='filters' show>
              <FilterList
                typeOptions={projectTypes}
                techOptions={techOptions}
                onToggleType={(type) =>
                  setFilters({ ...filters, types: toggle(filters.types, type) })
                }
                onToggleTech={(tech) =>
                  setFilters({ ...filters, tech: toggle(filters.tech, tech) })
                }
                onClear={clearFilters}
                hasFilters={hasFilters}
                resultCount={visibleProjects.length}
                totalCount={projects.length}
              />
            </Accordion>
          </div>
          <ProjectsContainer
            key={JSON.stringify(filters)}
            projects={visibleProjects}
            highlightedTech={filters.tech}
            onClearFilters={hasFilters ? clearFilters : undefined}
          />
        </main>
        <Footer />
      </section>
    </div>
  );
}
