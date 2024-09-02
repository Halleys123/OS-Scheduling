import PropTypes from "prop-types";
import { useState } from "react";

import SchedulerContext from "Context/SchedulerContext";

SchedulerProvider.propTypes = {
  children: PropTypes.node,
};

export default function SchedulerProvider({ children }) {
  const [currentGanttChart, setCurrentGanttChart] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [steps, setSteps] = useState([]);

  return (
    <SchedulerContext.Provider
      value={{
        currentGanttChart,
        setCurrentGanttChart,
        currentStepIndex,
        setCurrentStepIndex,
        steps,
        setSteps,
      }}
    >
      {children}
    </SchedulerContext.Provider>
  );
}
