import PropTypes from "prop-types";

Gantt.propTypes = {
  currentGanttChart: PropTypes.array,
};

export default function Gantt({ currentGanttChart = [] }) {
  return (
    <div className="flex self-stretch items-center my-4 gap-4 flex-col">
      <span className="text-lg">Gantt Chart</span>
      <div className="flex flex-row">
        {currentGanttChart.map((process, index) => (
          <div
            className={`h-12 w-12 border border-1 border-stone-300 flex items-center justify-center ${
              process.remaining_time == 0 ? "bg-green-200" : "bg-stone-50"
            }`}
            key={`${process.id}-${index}`}
          >
            {process.id}
          </div>
        ))}
      </div>
    </div>
  );
}
