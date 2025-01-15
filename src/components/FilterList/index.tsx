import Checkbox from "@/src/components/Checkbox";
import SkeletonCheckbox from "@/src/components/SkeletonCheckbox";

import "./style.scss";

interface TechnologyItem {
  name: string;
  icon?: string;
}

interface FilterListProps {
  technologies: TechnologyItem[];
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
  const handleCheckboxChange = (techName: string) => {
    const updatedFilters = selectedFilters.includes(techName)
      ? selectedFilters.filter((item) => item !== techName)
      : [...selectedFilters, techName];
    onFilterChange(updatedFilters);
  };

  // Если `isLoading`, рендерим скелетоны
  if (isLoading) {
    console.log("Rendering skeleton checkboxes");
    return (
      <div className='filter-list'>
        {[...Array(6)].map((_, index) => (
          <SkeletonCheckbox key={index} />
        ))}
      </div>
    );
  }

  // Рендерим реальный список фильтров
  return (
    <div className='filter-list'>
      {technologies.map((tech) => (
        <Checkbox
          key={tech.name}
          label={tech.name}
          icon={tech.icon || ""}
          isChecked={selectedFilters.includes(tech.name)}
          onChange={() => handleCheckboxChange(tech.name)}
        />
      ))}
    </div>
  );
};

export default FilterList;
