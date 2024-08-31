import PropTypes from "prop-types";
import Input from "./Input";

Input_Label.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default function Input_Label({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
  disabled = false,
  className = "",
  ...props
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={placeholder} className="text-sm text-gray-600">
        {label}
      </label>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
        disabled={disabled}
        className={className}
        {...props}
      />
    </div>
  );
}
