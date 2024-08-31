import { useState } from "react";
import PropTypes from "prop-types";

const Slider = ({
  min = -10,
  max = 10,
  step = 0.5,
  initial = 1,
  setValue = () => {},
  value = 1,
  label = "Deafult",
  className = "",
}) => {
  const handleChange = (e) => {
    setValue(parseFloat(e.target.value).toFixed(1));
  };

  return (
    <figure className={`flex flex-col items-center gap-1`}>
      <div className="flex flex-row self-stretch justify-between items-center">
        <label className="text-gray-700 text-">{label}</label>
        <span className="text-gray-700">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        className={className}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        defaultValue={initial}
      />
    </figure>
  );
};

Slider.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  initial: PropTypes.number,
  onChange: PropTypes.func,
  label: PropTypes.string,
  value: PropTypes.number,
  setValue: PropTypes.func,
  className: PropTypes.string,
};

export default Slider;
