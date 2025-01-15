import "./style.scss";

interface CheckboxProps {
  label: string;
  icon?: string;
  isChecked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  icon = "",
  isChecked,
  onChange,
}) => {
  return (
    <label className={`custom-checkbox ${isChecked ? "checked" : ""}`}>
      <input type='checkbox' checked={isChecked} onChange={onChange} />
      <span className='checkmark'>
        <i className='ri-check-line'></i>
      </span>
      <div className='label-box'>
        {icon && <i className={`icon ${icon}`}></i>}
        <span className='label-text'>{label}</span>
      </div>
    </label>
  );
};

export default Checkbox;
