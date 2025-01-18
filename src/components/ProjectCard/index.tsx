import React, { useState } from "react";
import Modal from "@/src/components/Modal";

import "./style.scss";

interface TechnologyItem {
  name: string;
  icon?: string;
}

interface ProjectCardProps {
  id: string;
  name: string;
  type: string;
  image: string;
  description: string;
  date: string;
  technologies: TechnologyItem[];
  link: string | null;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  name,
  type,
  image,
  description,
  date,
  technologies,
  link,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    console.log("openModal => setIsOpen(true)");
    setIsOpen(true);
  };

  const closeModal = () => {
    console.log("closeModal => setIsOpen(false)");
    setIsOpen(false);
  };

  return (
    <div className='project-card'>
      <h3 className='project-name'>
        {name} <span className='project-type grey'> // {type}</span>
      </h3>

      <div className='project-card-content'>
        <div className='project-image'>
          <img src={image} alt={`${name} preview`} />
          {link && (
            <a
              href={link}
              target='_blank'
              rel='noopener noreferrer'
              className='open-project-button'
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <i className='ri-share-box-fill'></i>
            </a>
          )}
        </div>

        <div className='project-box'>
          <div className='project-description-box'>
            <p className='project-description'>{description}</p>
            <div className='project-technologies'>
              {technologies.map((techItem) => (
                <span key={techItem.name} className='tech-tag'>
                  {techItem.name}
                </span>
              ))}
            </div>
          </div>
          <div className='project-meta'>
            <p className='project-date'>{date}</p>
            <button
              type='button'
              className='details-button'
              onClick={(e) => {
                e.stopPropagation();
                openModal();
              }}
            >
              _details
            </button>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <div className='modal-content'>
          <div className='title-box'>
            <h2 className='modal-title'>
              {name} <span className='modal-type'> // {type}</span>
            </h2>
            <button onClick={closeModal} className='close-modal-button'>
              <i className='ri-close-large-line'></i>
            </button>
          </div>
          <div className='modal-subinfo'>
            <p className='modal-date'>{date}</p>
            {link && (
              <a
                href={link}
                target='_blank'
                rel='noopener noreferrer'
                className='open-project-button'
              >
                <i className='ri-share-box-fill'></i>
              </a>
            )}
          </div>

          <img src={image} alt={`${name} preview`} className='modal-image' />

          <p className='modal-description'>{description}</p>

          <div className='modal-technologies'>
            {technologies.map((techItem) => (
              <span key={techItem.name} className='modal-tech-tag'>
                {techItem.icon && (
                  <i className={`tech-icon ${techItem.icon}`}></i>
                )}
                {techItem.name}
              </span>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProjectCard;
