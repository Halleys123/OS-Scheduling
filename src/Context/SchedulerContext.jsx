import { createContext } from "react";

const SchedulerContext = createContext({
  setCurrentGanttChart: () => {},
  setCurrentStepIndex: () => {},
  currentGanttChart: [],
  currentStepIndex: 0,
  setSteps: () => {},
  steps: [],
});

export default SchedulerContext;
