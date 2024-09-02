import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import ProcessDetailsCard from "./ProcessCard";

ProcessTable.propTypes = {
  processes: PropTypes.array.isRequired,
  currentTime: PropTypes.number,
};

function ProcessTable({ processes, currentTime = 3 }) {
  const [sortby, setSortby] = useState("id");
  const [process_temp, setProcess_temp] = useState([...processes]);
  const showPriority = process_temp.some(
    (process) => process.priority !== undefined
  );
  const showQuantum = process_temp.some(
    (process) => process.quantum !== undefined
  );

  useEffect(() => {
    switch (sortby) {
      case "id":
        setProcess_temp([...processes].sort((a, b) => a.id - b.id));
        break;
      case "arrival_time":
        setProcess_temp(
          [...processes].sort((a, b) => a.arrival_time - b.arrival_time)
        );
        break;
      case "burst_time":
        setProcess_temp(
          [...processes].sort((a, b) => a.burst_time - b.burst_time)
        );
        break;
      case "priority":
        setProcess_temp([...processes].sort((a, b) => a.priority - b.priority));
        break;
      case "quantum":
        setProcess_temp([...processes].sort((a, b) => a.quantum - b.quantum));
        break;
      case "start_time":
        setProcess_temp(
          [...processes].sort((a, b) => a.start_time - b.start_time)
        );
        break;
      case "completion_time":
        setProcess_temp(
          [...processes].sort((a, b) => a.completion_time - b.completion_time)
        );
        break;
      case "waiting_time":
        setProcess_temp(
          [...processes].sort((a, b) => a.waiting_time - b.waiting_time)
        );
        break;
      case "turnaround_time":
        setProcess_temp(
          [...processes].sort((a, b) => a.turnaround_time - b.turnaround_time)
        );
        break;
      default:
        break;
    }
  }, [sortby, processes]);
  return (
    <div className="overflow-x-visible md:overflow-x-auto">
      <table className="hidden md:block min-w-full bg-white border border-gray-200 rounded-lg">
        <thead>
          <tr className="text-xs md:text-sm text-stone-500 font-sans bg-stone-50">
            <th
              className="px-4 py-2"
              onClick={() => {
                setSortby("id");
              }}
            >
              ID
            </th>
            <th
              className="px-4 py-2"
              onClick={() => {
                setSortby("arrival_time");
              }}
            >
              Arrival Time
            </th>
            <th
              className="px-4 py-2"
              onClick={() => {
                setSortby("burst_time");
              }}
            >
              Burst Time
            </th>
            {showPriority && <th className="px-4 py-2">Priority</th>}
            {showQuantum && <th className="px-4 py-2">Quantum</th>}
            <th className="px-4 py-2">Start Time</th>
            <th className="px-4 py-2">Completion Time</th>
            <th className="px-4 py-2">Waiting Time</th>
            <th className="px-4 py-2">Turnaround Time</th>
          </tr>
        </thead>
        <tbody className="text-sm md:text-base font-sans">
          {process_temp
            .filter((process) => process.arrival_time <= currentTime)
            .map((process) => {
              return (
                <tr
                  key={process.id}
                  className="text-center border-t border-gray-200"
                >
                  <td className="px-4 py-2">{process.id}</td>
                  <td className="px-4 py-2">{process.arrival_time}</td>
                  <td className="px-4 py-2">{process.burst_time}</td>
                  {showPriority && (
                    <td className="px-4 py-2">{process.priority ?? "-"}</td>
                  )}
                  {showQuantum && (
                    <td className="px-4 py-2">{process.quantum ?? "-"}</td>
                  )}
                  <td className="px-4 py-2">{process.start_time ?? "-"}</td>
                  <td className="px-4 py-2">
                    {process.completion_time ?? "-"}
                  </td>
                  <td className="px-4 py-2">{process.waiting_time ?? "-"}</td>
                  <td className="px-4 py-2">
                    {process.turnaround_time ?? "-"}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="flex md:hidden flex-col gap-4">
        {process_temp.map((process, index) => {
          return <ProcessDetailsCard key={index} process={process} />;
        })}
      </div>
    </div>
  );
}

export default ProcessTable;
