import SchedulerContext from "Context/SchedulerContext";
import { useContext } from "react";

export default function useScheduler() {
  const {
    currentGanttChart,
    setCurrentGanttChart,
    currentStepIndex,
    setCurrentStepIndex,
    steps,
    setSteps,
  } = useContext(SchedulerContext);

  return {
    currentGanttChart,
    setCurrentGanttChart,
    currentStepIndex,
    setCurrentStepIndex,
    steps,
    setSteps,
  };
}
