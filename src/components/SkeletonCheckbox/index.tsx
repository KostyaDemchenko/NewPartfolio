import { Skeleton } from "@mui/material";

import "./style.scss";

const SkeletonCheckbox: React.FC = () => {
  return (
    <label className='custom-checkbox skeleton-checkbox'>
      <Skeleton
        variant='rectangular'
        animation='wave'
        className='sk-checkmark'
      />
      <Skeleton variant='text' animation='wave' className='sk-label' />
    </label>
  );
};

export default SkeletonCheckbox;
