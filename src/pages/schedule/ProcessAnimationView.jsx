import useScheduler from "hooks/useScheduler";

import HoveringBoard from "layout/HoveringBoard";
import ProcessTable from "./ProcessTable";
import Gantt from "./Gantt";

export default function ProcessAnimationViewer() {
  const { steps, currentStepIndex, currentGanttChart } = useScheduler();
  return (
    <HoveringBoard className="flex-1 min-h-[600px] md:h-full p-4 overflow-y-scroll">
      <div className="flex flex-row self-stretch justify-between items-center">
        <span className="text-md md:text-lg font-bold">Process Table</span>
        <span className="text-xs text-stone-500 font-medium">
          {steps.length > 0 &&
            `Current Time: ${currentStepIndex} of ${steps.length - 1}`}
        </span>
      </div>
      {currentGanttChart.length > 0 && (
        <Gantt currentGanttChart={currentGanttChart} />
      )}

      {steps.length > 0 ? (
        <ProcessTable
          processes={steps[currentStepIndex]}
          currentTime={currentStepIndex}
        />
      ) : (
        <span className="text-sm text-stone-500 font-medium">
          Start by selecting a scheduling algorithm and then adding processes
          arrival, burst time and priority.
        </span>
      )}
    </HoveringBoard>
  );
}
