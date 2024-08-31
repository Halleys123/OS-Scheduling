import PropTypes from "prop-types";
import Dropdown from "./Dropdown";

Dropdown_Label.propTypes = {
  options: PropTypes.array,
  onSelect: PropTypes.func,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  label: PropTypes.string,
};

export default function Dropdown_Label({
  options,
  onSelect,
  placeholder = "Select an option",
  defaultValue = "",
  disabled = false,
  className = "",
  label = "",
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={placeholder} className="text-sm text-gray-600">
        {label}
      </label>
      <Dropdown
        options={options}
        onSelect={onSelect}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
        className={className}
      />
    </div>
  );
}
