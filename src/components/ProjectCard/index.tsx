import React, { useState } from "react";
import Modal from "@/src/components/Modal";
import type { Project } from "@/src/types/project";

import "./style.scss";

const MAX_CARD_TAGS = 5;

interface ProjectCardProps {
  project: Project;
  highlightedTech?: string[];
}

const ProjectImage = ({
  src,
  alt,
  className,
}: {
  src: string | null;
  alt: string;
  className?: string;
}) =>
  src ? (
    // Sanity already serves a resized WebP/AVIF, so a plain <img> is enough here.
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} className={className} loading='lazy' decoding='async' />
  ) : (
    <div className={`image-placeholder ${className ?? ""}`} aria-hidden='true'>
      <i className='ri-code-s-slash-line'></i>
    </div>
  );

const ProjectCard: React.FC<ProjectCardProps> = ({ project, highlightedTech = [] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { name, type, image, description, dateLabel, technologies, source } = project;

  const isHighlighted = (slug: string) => highlightedTech.includes(slug);
  const tagClass = (slug: string) => `tech-tag ${isHighlighted(slug) ? "highlighted" : ""}`;

  // Cards have a fixed height, so show a few tags (filtered ones first) and a counter.
  const cardTech = [...technologies].sort(
    (a, b) => Number(isHighlighted(b.slug)) - Number(isHighlighted(a.slug))
  );
  const visibleTech = cardTech.slice(0, MAX_CARD_TAGS);
  const hiddenTechCount = cardTech.length - visibleTech.length;

  return (
    <article className='project-card'>
      <h3 className='project-name'>
        {name} <span className='project-type grey'>// {type}</span>
      </h3>

      <div className='project-card-content'>
        <div className='project-image'>
          <ProjectImage src={image} alt={`${name} preview`} />
          {source && (
            <a
              href={source}
              target='_blank'
              rel='noopener noreferrer'
              className='open-project-button'
              aria-label={`Open ${name}`}
            >
              <i className='ri-share-box-fill' aria-hidden='true'></i>
            </a>
          )}
        </div>

        <div className='project-box'>
          <div className='project-description-box'>
            <p className='project-description'>{description}</p>
            <div className='project-technologies'>
              {visibleTech.map((tech) => (
                <span key={tech.slug} className={tagClass(tech.slug)}>
                  {tech.name}
                </span>
              ))}
              {hiddenTechCount > 0 && (
                <span className='tech-tag more' title={cardTech.slice(MAX_CARD_TAGS).map((t) => t.name).join(", ")}>
                  +{hiddenTechCount}
                </span>
              )}
            </div>
          </div>
          <div className='project-meta'>
            <p className='project-date'>{dateLabel}</p>
            <button
              type='button'
              className='details-button'
              onClick={() => setIsOpen(true)}
            >
              _details
            </button>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} label={name}>
        <div className='modal-content'>
          <div className='title-box'>
            <h2 className='modal-title'>
              {name} <span className='modal-type'>// {type}</span>
            </h2>
            <button
              type='button'
              onClick={() => setIsOpen(false)}
              className='close-modal-button'
              aria-label='Close'
            >
              <i className='ri-close-large-line' aria-hidden='true'></i>
            </button>
          </div>
          <div className='modal-subinfo'>
            <p className='modal-date'>{dateLabel}</p>
            {source && (
              <a
                href={source}
                target='_blank'
                rel='noopener noreferrer'
                className='open-project-button'
                aria-label={`Open ${name}`}
              >
                <i className='ri-share-box-fill' aria-hidden='true'></i>
              </a>
            )}
          </div>

          <ProjectImage src={image} alt={`${name} preview`} className='modal-image' />

          <p className='modal-description'>{description}</p>

          <div className='modal-technologies'>
            {technologies.map((tech) => (
              <span key={tech.slug} className='modal-tech-tag'>
                {tech.icon && <i className={`tech-icon ${tech.icon}`} aria-hidden='true'></i>}
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </Modal>
    </article>
  );
};

export default ProjectCard;
