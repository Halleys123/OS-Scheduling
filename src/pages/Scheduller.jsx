import { useEffect, useState } from "react";

import { DiGithubBadge } from "react-icons/di";
import { AiFillLinkedin } from "react-icons/ai";

import FCFS from "../logic/fcfs";
import shortestRemainingTimeFirst from "../logic/srtf";
import shortestJobFirst from "../logic/sjf";
import priority_preemptive from "../logic/priority_p";
// import priority_non_preemptive from "../logic/priority_non_preemptive";
import Process from "../logic/Process";

import Dropdown_Label from "../components/UI/Dropdown/Dropdown_Label";
import Input_Label from "../components/UI/Input/Input_Label";
import Button from "../components/UI/Button";
import Slider from "../components/UI/Slider";
import ProcessTable from "../components/ProcessTable";
import HoveringBoard from "../Layout/HoveringBoard";
import MiniIcon from "../components/UI/MiniIcons";

const options = [
  {
    value: "firstComeFirstServe",
    label: "First Come First Serve",
    requirements: ["Arrival Time", "Burst Time"],
    id: "fcfs",
    working: true,
  },
  {
    value: "SJF",
    label: "Shortest Job First",
    requirements: ["Arrival Time", "Burst Time"],
    id: "shortest_job_first",
    working: false,
  },
  {
    value: "shortestRemainingTimeFirst",
    label: "Shortest Remaining Time First",
    requirements: ["Arrival Time", "Burst Time"],
    id: "shortestRemainingTimeFirst",
    working: true,
  },
  {
    value: "Priority Preemptive",
    label: "Priority Preemptive",
    requirements: ["Arrival Time", "Burst Time", "Priority"],
    id: "priority_preemptive",
    working: true,
  },
  {
    value: "Priority Non-Preemptive",
    label: "Priority Non-Preemptive",
    requirements: ["Arrival Time", "Burst Time", "Priority"],
    id: "priority_non_preemptive",
    working: false,
  },
];

const sortGantBy = [
  {
    value: "arrival_time",
    label: "default",
  },
  {
    value: "arrival_time",
    label: "Arrival Time",
  },
  {
    value: "burst_time",
    label: "Burst Time",
  },
  {
    value: "priority",
    label: "Priority",
  },
  {
    value: "completion_time",
    label: "Completion Time",
  },
  {
    value: "turnaround_time",
    label: "Turnaround Time",
  },
];

export default function Scheduller() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [selectedSortBy, setSelectedSortBy] = useState("arrival_time");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [animationEnded, setAnimationEnded] = useState(true);

  const [steps, setSteps] = useState([]);
  const [currentGanttChart, setCurrentGanttChart] = useState([]);
  const [inputs, setInputs] = useState({
    "Arrival Time": "",
    "Burst Time": "",
    Priority: "",
  });

  function handleSelect(selected) {
    setSelectedAlgorithm(selected);
    setInputs((prev) => ({
      "Arrival Time": prev["Arrival Time"],
      "Burst Time": prev["Burst Time"],
      Priority: prev.Priority,
    }));
  }

  useEffect(() => {
    if (steps.length === 0) return;

    let interval;

    if (speed !== 0 && !animationEnded) {
      setAnimationEnded(false);

      interval = setInterval(() => {
        setCurrentStepIndex((prevIndex) => {
          let nextIndex = prevIndex + Math.sign(speed);

          if (nextIndex >= steps.length || nextIndex < 0) {
            clearInterval(interval);
            setAnimationEnded(true);
            return prevIndex;
          }

          setCurrentGanttChart(
            steps[nextIndex]
              .filter((p) => p.arrival_time <= nextIndex)
              .sort((a, b) => a[selectedSortBy] - b[selectedSortBy])
          );

          return nextIndex;
        });
      }, 1000 / Math.abs(speed));
    }

    return () => clearInterval(interval);
  }, [speed, steps, selectedSortBy, animationEnded]);

  return (
    <div className="h-full w-full flex flex-row gap-8 relative">
      <HoveringBoard className="w-1/4 h-full p-4 flex flex-col gap-4 overflow-y-scroll overflow-x-hidden">
        <span className="text-lg font-bold">Process Input</span>
        <Dropdown_Label
          placeholder="Select an Algorithm"
          onSelect={handleSelect}
          options={options.filter((o) => o.working)}
          label="Select Algorithm"
          disabled={!animationEnded}
        />
        {selectedAlgorithm ? (
          options
            .find((o) => o.value === selectedAlgorithm)
            .requirements.map((req) => (
              <Input_Label
                key={req}
                label={req}
                placeholder={`0 1 5 7 8`}
                value={inputs[req]}
                onChange={(e) =>
                  setInputs({ ...inputs, [req]: e.target.value })
                }
              />
            ))
        ) : (
          <span> Select an Algorithm to input data</span>
        )}
        <Button
          disabled={
            !checkValidInput({
              arrivalTime: inputs["Arrival Time"],
              burstTime: inputs["Burst Time"],
              priority: inputs.Priority,
              selectedAlgorithm,
            })
          }
          className="mt-8"
          variant="primary"
          onClick={() => {
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
          }}
        >
          {animationEnded ? "Start" : speed === 0 ? "Resume" : "Pause"}
        </Button>
        {!animationEnded && (
          <Button
            variant="secondary"
            onClick={() => {
              setSpeed(0);
              setAnimationEnded(true);
              setCurrentStepIndex(0);
              setSteps([]);
              setCurrentGanttChart([]);
            }}
          >
            Reset
          </Button>
        )}
        {!checkValidInput({
          arrivalTime: inputs["Arrival Time"],
          burstTime: inputs["Burst Time"],
          priority: inputs.Priority,
          selectedAlgorithm,
        }) && <Button variant="help">Help</Button>}
        {steps.length > 0 &&
          checkValidInput({
            arrivalTime: inputs["Arrival Time"],
            burstTime: inputs["Burst Time"],
            priority: inputs.Priority,
            selectedAlgorithm,
          }) && (
            <>
              <div className="flex flex-col self-stretch">
                <Slider
                  label="Speed Control"
                  value={speed}
                  setValue={setSpeed}
                  className="self-stretch"
                />
              </div>
              <Dropdown_Label
                label="Sort Gantt Chart By"
                onSelect={setSelectedSortBy}
                options={sortGantBy}
              />
            </>
          )}
        <div className="flex flex-row self-stretch gap-6 mt-auto px-2 pt-12">
          <MiniIcon
            label="Contribute"
            href="https://github.com/Halleys123/OS-Scheduling"
            icon={<DiGithubBadge size={24} />}
          />
          <MiniIcon
            label="LinkedIn"
            href="https://www.linkedin.com/in/arnav-chhabra-51072316b/"
            icon={<AiFillLinkedin size={24} />}
          />
        </div>
      </HoveringBoard>
      <HoveringBoard className="flex-1 h-full p-4 overflow-y-scroll">
        <div className="flex flex-row self-stretch justify-between items-center">
          <span className="text-lg font-bold">Process Table</span>
          <div
            className={`min-w-16 px-3 bg-purple-50 text-center ${
              selectedAlgorithm && "py-1"
            }`}
          >
            <span>
              {currentStepIndex} / {steps.length}
            </span>
          </div>
        </div>
        {currentGanttChart.length > 0 && (
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
        )}

        {steps.length > 0 && (
          <ProcessTable
            processes={steps[currentStepIndex]}
            currentTime={currentStepIndex}
          />
        )}
      </HoveringBoard>
    </div>
  );
}

function checkValidInput({
  arrivalTime,
  burstTime,
  priority,
  selectedAlgorithm,
}) {
  let valid = false;

  let arrival_array = arrivalTime.trim().split(" ");
  let burst_array = burstTime.trim().split(" ");
  let priority_array = priority.trim().split(" ");

  if (!arrivalTime || !burstTime) return valid;
  if (!selectedAlgorithm) return valid;
  if (
    options
      .find((o) => o.value === selectedAlgorithm)
      .requirements.includes("Priority")
  ) {
    valid =
      arrival_array.length === burst_array.length &&
      burst_array.length === priority_array.length;
    // no two priorities should have same value
    if (valid) {
      let priority_set = new Set(priority_array);
      valid = priority_set.size === priority_array.length;
    }
  } else {
    valid = arrival_array.length === burst_array.length;
  }
  return valid;
}
