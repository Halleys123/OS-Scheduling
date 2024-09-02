import { useState } from "react";
import { PropTypes } from "prop-types";

import Tooltip from "../Tooltip";

Dropdown.propTypes = {
  options: PropTypes.array,
  onSelect: PropTypes.func,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  label: PropTypes.string,
};

function Dropdown({
  options,
  onSelect,
  placeholder = "Select an option",
  defaultValue = "",
  disabled = false,
  className = "",
}) {
  const [selected, setSelected] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} name={placeholder}>
      <button
        title={placeholder}
        className={`w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-3 py-2 text-sm text-left cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${
          disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        {selected
          ? options.find((option) => option.value === selected).label
          : placeholder}
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.707a1 1 0 011.414 0L10 11l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-44 p-1 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
          {options.map((option) => (
            <ul key={option.value}>
              <button
                className={`text-gray-900 cursor-pointer select-none relative flex flex-row h-8 rounded-sm items-center pl-3 hover:bg-indigo-600 w-full hover:text-white focus-within:bg-purple-50 ${
                  selected === option.value ? "font-semibold" : "font-normal"
                }`}
                onClick={() => handleSelect(option.value)}
              >
                <span className="block truncate">{option.label}</span>
                {selected === option.value && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 00-1.414 0L10 10.586 6.707 7.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l6-6a1 1 0 000-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </button>
            </ul>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dropdown;
