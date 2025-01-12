import { Skeleton } from "@mui/material";

import "./style.scss";

const SkeletonCard: React.FC = () => {
  return (
    <div className='project-card skeleton-card'>
      {/* Заголовок карточки */}
      <div className='skeleton-header'>
        <Skeleton variant='text' className='sk-project-name' animation='wave' />
      </div>

      {/* Основное содержимое */}
      <div className='project-card-content'>
        {/* Изображение и кнопка */}
        <div className='project-image'>
          <Skeleton
            variant='rectangular'
            className='sk-image'
            animation='wave'
          />
          <Skeleton
            variant='circular'
            className='sk-open-project-button'
            animation='wave'
          />
        </div>

        <div className='project-box'>
          <div className='project-description-box'>
            <Skeleton
              variant='text'
              className='sk-description'
              animation='wave'
            />
            <Skeleton
              variant='text'
              className='sk-description'
              animation='wave'
            />
            {/* Технологии (имитация нескольких тегов) */}
            <Skeleton
              variant='rectangular'
              className='sk-technologies'
              animation='wave'
            />
          </div>
          {/* Дата/мета */}
          <Skeleton variant='text' className='sk-meta' animation='wave' />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
