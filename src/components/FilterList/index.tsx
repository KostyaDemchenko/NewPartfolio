import Checkbox from "@/src/components/Checkbox";
import type { FilterOption } from "@/src/utils/projectFilters";

import "./style.scss";

interface FilterListProps {
  typeOptions: FilterOption[];
  techOptions: FilterOption[];
  onToggleType: (type: string) => void;
  onToggleTech: (tech: string) => void;
  onClear: () => void;
  hasFilters: boolean;
  resultCount: number;
  totalCount: number;
}

const FilterGroup = ({
  title,
  options,
  onToggle,
}: {
  title: string;
  options: FilterOption[];
  onToggle: (value: string) => void;
}) => (
  <fieldset className='filter-group'>
    <legend className='filter-group-title'>{title}</legend>
    {options.map((option) => (
      <Checkbox
        key={option.value}
        label={option.label}
        icon={option.icon}
        count={option.count}
        isChecked={option.selected}
        // An option that would leave no projects is disabled instead of hidden,
        // so the list does not jump around while filtering.
        disabled={!option.selected && option.count === 0}
        onChange={() => onToggle(option.value)}
      />
    ))}
  </fieldset>
);

const FilterList: React.FC<FilterListProps> = ({
  typeOptions,
  techOptions,
  onToggleType,
  onToggleTech,
  onClear,
  hasFilters,
  resultCount,
  totalCount,
}) => {
  return (
    <div className='filter-list'>
      <div className='filter-summary'>
        <p>
          <span className='filter-count'>{resultCount}</span>
          <span className='grey'> / {totalCount} projects</span>
        </p>
        {hasFilters && (
          <button type='button' className='filter-clear' onClick={onClear}>
            <i className='ri-close-line' aria-hidden='true'></i>
            clear
          </button>
        )}
      </div>

      {typeOptions.length > 1 && (
        <FilterGroup title='// type' options={typeOptions} onToggle={onToggleType} />
      )}
      <FilterGroup title='// tech' options={techOptions} onToggle={onToggleTech} />
    </div>
  );
};

export default FilterList;
