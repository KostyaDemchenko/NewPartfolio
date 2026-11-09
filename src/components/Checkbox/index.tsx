import "./style.scss";

interface CheckboxProps {
  label: string;
  icon?: string | null;
  count?: number;
  isChecked: boolean;
  disabled?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  icon,
  count,
  isChecked,
  disabled = false,
  onChange,
}) => {
  const className = [
    "custom-checkbox",
    isChecked ? "checked" : "",
    disabled ? "disabled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label className={className}>
      <input
        type='checkbox'
        checked={isChecked}
        disabled={disabled}
        onChange={onChange}
      />
      <span className='checkmark' aria-hidden='true'>
        <i className='ri-check-line'></i>
      </span>
      <span className='label-box'>
        {icon && <i className={`icon ${icon}`} aria-hidden='true'></i>}
        <span className='label-text'>{label}</span>
      </span>
      {typeof count === "number" && <span className='label-count'>{count}</span>}
    </label>
  );
};

export default Checkbox;
