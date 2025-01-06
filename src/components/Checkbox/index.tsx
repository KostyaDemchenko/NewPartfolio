import "./style.scss";

interface CheckboxProps {
  label: string;
  isChecked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, isChecked, onChange }) => {
  return (
    <label className={`custom-checkbox ${isChecked ? "checked" : ""}`}>
      <input type='checkbox' checked={isChecked} onChange={onChange} />
      <span className='checkmark'>
        <i className='ri-check-line'></i>
      </span>
      <span className='label-text'>{label}</span>
    </label>
  );
};

export default Checkbox;
