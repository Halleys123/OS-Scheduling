import { PropTypes } from "prop-types";

Button.propTypes = {
  variant: PropTypes.oneOf([
    "normal",
    "primary",
    "secondary",
    "danger",
    "help",
  ]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
};

function Button({
  variant = "normal",
  disabled = false,
  onClick,
  children,
  className = "",
}) {
  const baseStyles =
    "px-4 py-2 text-sm rounded focus:outline-none transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50";
  const variantStyles = {
    primary:
      "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 disabled:bg-indigo-400",
    secondary:
      "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 disabled:bg-gray-200",
    normal:
      "bg-gray-100 text-gray-800 border border-gray-300 hover:bg-gray-200 hover:text-gray-900 focus:ring-2 focus:ring-gray-500 disabled:bg-gray-200 disabled:text-gray-400 disabled:border-gray-200",

    help: "bg-green-600 text-white hover:bg-green-700 focus:ring-2 focus:ring-red-500 disabled:bg-red-400 cursor-help",
  };

  const styles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  return (
    <button className={styles} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
