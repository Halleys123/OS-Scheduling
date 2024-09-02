import priority_preemptive from "logic/priority_p";
import shortestRemainingTimeFirst from "logic/srtf";
import shortestJobFirst from "logic/sjf";
import Process from "logic/Process";
import FCFS from "logic/fcfs";

function handleReset({
  setSpeed,
  setAnimationEnded,
  setCurrentStepIndex,
  setSteps,
  setCurrentGanttChart,
  setInputs,
  setSelectedAlgorithm,
}) {
  setSpeed(0);
  setAnimationEnded(true);
  setCurrentStepIndex(0);
  setSteps([]);
  setCurrentGanttChart([]);
  setInputs({
    "Arrival Time": "",
    "Burst Time": "",
    Priority: "",
  });
  setSelectedAlgorithm(null);
}
function handleControl({
  setSpeed,
  setAnimationEnded,
  setCurrentStepIndex,
  setSteps,
  setCurrentGanttChart,
  inputs,
  selectedAlgorithm,
  selectedSortBy,
  speed,
  animationEnded,
}) {
  if (!animationEnded && speed !== 0) {
    setSpeed(0);
    return;
  }
  if (animationEnded) {
    setSteps([]);
    setCurrentGanttChart([]);
    setCurrentStepIndex(0);
    setSpeed(1);

    const arrival_array = inputs["Arrival Time"].trim().split(" ");
    const burst_array = inputs["Burst Time"].trim().split(" ");
    const priority_array = inputs.Priority.trim().split(" ");

    const processes = arrival_array.map((arrival, index) => {
      return new Process(
        index + 1,
        parseInt(arrival),
        parseInt(burst_array[index]),
        parseInt(priority_array[index] ?? 1)
      );
    });
    if (selectedAlgorithm === "firstComeFirstServe") {
      const fcfs = new FCFS();
      processes.forEach((process) => fcfs.addProcess(process));
      fcfs.schedule();
      const steps = fcfs.getSteps();
      console.log(steps);
      setSteps(steps);
      setCurrentGanttChart(
        steps[0].sort((a, b) => a[selectedSortBy] - b[selectedSortBy])
      );
      setAnimationEnded(false);
    } else if (selectedAlgorithm === "shortestRemainingTimeFirst") {
      const sjf = new shortestRemainingTimeFirst();
      processes.forEach((process) => sjf.addProcess(process));
      sjf.schedule();
      const steps = sjf.getSteps();
      console.log(steps);
      setSteps(steps);
      setCurrentGanttChart(
        steps[0].sort((a, b) => a[selectedSortBy] - b[selectedSortBy])
      );
      setAnimationEnded(false);
    } else if (selectedAlgorithm === "SJF") {
      const sjf = new shortestJobFirst();
      processes.forEach((process) => sjf.addProcess(process));
      sjf.schedule();
      const steps = sjf.getSteps();
      console.log(steps);
      setSteps(steps);
      setCurrentGanttChart(
        steps[0].sort((a, b) => a[selectedSortBy] - b[selectedSortBy])
      );
      setAnimationEnded(false);
    } else if (selectedAlgorithm === "Priority Preemptive") {
      const priority = new priority_preemptive();
      processes.forEach((process) => priority.addProcess(process));
      priority.schedule();
      const steps = priority.getSteps();
      console.log(steps);
      setSteps(steps);
      setCurrentGanttChart(
        steps[0].sort((a, b) => a[selectedSortBy] - b[selectedSortBy])
      );
      setAnimationEnded(false);
    }
  } else {
    setSpeed(1);
  }
}

export { handleReset, handleControl };
