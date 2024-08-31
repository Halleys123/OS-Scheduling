import { PropTypes } from "prop-types";

HoveringBoard.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default function HoveringBoard({ className, children }) {
  return (
    <div
      className={`shadow-lg rounded-lg outline outline-1 outline-stone-200 bg-white hover:shadow-lg transition-all ${className}`}
    >
      {children}
    </div>
  );
}
