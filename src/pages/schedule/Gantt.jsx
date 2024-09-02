import PropTypes from "prop-types";

Gantt.propTypes = {
  currentGanttChart: PropTypes.array,
};

export default function Gantt({ currentGanttChart = [] }) {
  return (
    <div className="flex self-stretch items-center my-4 gap-4 flex-col">
      <span className="text-md md:text-lg">Gantt Chart</span>
      <div className="flex flex-row">
        {currentGanttChart.map((process, index) => (
          <div
            className={`h-8 w-8 md:h-12 md:w-12 text-sm md:text-md font-semibold text-stone-500 border-stone-300 flex items-center justify-center ${
              process.remaining_time == 0 ? "bg-green-200" : "bg-stone-50"
            }
            ${
              currentGanttChart.length == 1
                ? "border"
                : index != currentGanttChart.length - 1
                ? "border-t-[1px] border-b-[1px] border-l-[1px]"
                : "border-[1px]"
            }
            `}
            key={`${process.id}-${index}`}
          >
            {process.id}
          </div>
        ))}
      </div>
    </div>
  );
}
