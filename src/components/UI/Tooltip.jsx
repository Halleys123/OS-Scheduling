import React, { useEffect, useState, memo } from "react";
import PropTypes from "prop-types";

const Tooltip = memo(function Tooltip({ children, content, position = "top" }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const positionClasses = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-2",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-2",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-2",
  };

  useEffect(() => {
    let timer;
    if (isHovered) {
      timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
    } else {
      setIsVisible(false);
    }
    return () => clearTimeout(timer);
  }, [isHovered]);

  return (
    <div
      className="relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      {children}
      {isVisible && (
        <div
          className={`absolute whitespace-nowrap px-2 py-1 bg-black text-white text-sm rounded shadow-lg z-10 ${positionClasses[position]}`}
        >
          {content}
        </div>
      )}
    </div>
  );
});

Tooltip.propTypes = {
  children: PropTypes.node,
  content: PropTypes.node,
  position: PropTypes.string,
};

export default Tooltip;
