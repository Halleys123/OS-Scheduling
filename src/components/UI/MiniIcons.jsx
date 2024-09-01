import PropTypes from "prop-types";

MiniIcon.propTypes = {
  icon: PropTypes.node.isRequired,
  href: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "secondary", "normal"]),
  label: PropTypes.string,
};

export default function MiniIcon({
  icon = "",
  href = "",
  onClick = () => {},
  className = "",
  variant = "normal",
  label = "",
}) {
  const baseClass =
    "w-10 h-10 rounded-md flex items-center justify-center cursor-pointer outline outline-1 outline-stone-200 transition-colors duration-200";

  const variantClasses = {
    primary: "bg-blue-500 hover:bg-blue-600 text-white",
    secondary: "bg-gray-500 hover:bg-gray-600 text-white",
    normal: "bg-slate-50 hover:bg-slate-100 text-gray-800",
  };

  const combinedClassName = `${baseClass} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <div className="flex flex-col items-center gap-1 w-10">
        <a
          className={combinedClassName}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
        >
          {icon}
        </a>
        {label && (
          <label
            htmlFor={label}
            className="text-xs text-gray-500 text-wrap text-center"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
  return (
    <button className={combinedClassName} onClick={onClick}>
      {icon}
    </button>
  );
}
