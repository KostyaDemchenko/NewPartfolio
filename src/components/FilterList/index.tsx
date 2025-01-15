import Checkbox from "@/src/components/Checkbox";
import SkeletonCheckbox from "@/src/components/SkeletonCheckbox";

import "./style.scss";

interface FilterListProps {
  technologies: string[];
  selectedFilters: string[];
  onFilterChange: (selectedFilters: string[]) => void;
  isLoading?: boolean;
}

const FilterList: React.FC<FilterListProps> = ({
  technologies,
  selectedFilters,
  onFilterChange,
  isLoading = false,
}) => {
  const handleCheckboxChange = (tech: string) => {
    let updatedFilters: string[];
    if (selectedFilters.includes(tech)) {
      updatedFilters = selectedFilters.filter((item) => item !== tech);
    } else {
      updatedFilters = [...selectedFilters, tech];
    }
    onFilterChange(updatedFilters);
  };

  // If loading => show 6 skeleton checkboxes
  if (isLoading) {
    return (
      <div className='filter-list'>
        {[...Array(6)].map((_, index) => (
          <SkeletonCheckbox key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className='filter-list'>
      {technologies.map((tech) => (
        <Checkbox
          key={tech}
          label={tech}
          isChecked={selectedFilters.includes(tech)}
          onChange={() => handleCheckboxChange(tech)}
        />
      ))}
    </div>
  );
};

export default FilterList;
