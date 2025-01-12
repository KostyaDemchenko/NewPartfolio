import Checkbox from "@/src/components/Checkbox";

import "./style.scss";

interface FilterListProps {
  technologies: string[];
  onFilterChange: (selectedFilters: string[]) => void;
  selectedFilters: string[];
}

const FilterList: React.FC<FilterListProps> = ({
  technologies,
  onFilterChange,
  selectedFilters,
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
