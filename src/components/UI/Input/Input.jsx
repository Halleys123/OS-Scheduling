import PropTypes from "prop-types";

InputField.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

function InputField({
  placeholder = "Enter text",
  value = "",
  onChange = () => {},
  type = "text",
  disabled = false,
  className = "",
  ...props
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`block w-full pl-3 p-2 text-gray-700 text-sm bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500 ${className}`}
      {...props}
    />
  );
}

export default InputField;
