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
  return (
    <div className='project-card'>
      <h3 className='project-name'>
        {name} <span className='project-type grey'>// {type}</span>
      </h3>

      <div className='project-card-content'>
        <div className='project-image'>
          <img src={image} alt={`${name} preview picture`} />
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

        <div className='project-box'>
          <div className='project-description-box'>
            <p className='project-description'>{description}</p>
            <div className='project-technologies'>
              {technologies?.map((techItem) => (
                <span key={techItem?.name || ""} className='tech-tag'>
                  {techItem?.name}
                </span>
              ))}
            </div>
          </div>

          <p className='project-meta'>{date}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
