import PropTypes from "prop-types";
import { Clock, ArrowRight, Hourglass } from "lucide-react";
// "ID",
// "Arrival Time",
// "Burst Time",
// "Priority",
// "Quantum",
// "Start Time",
// "Completion Time",
// "Waiting Time",
// "Turnaround Time",

const ProcessDetailsCard = ({ process }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold mb-4">
          Process Information
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 bg-gray-100 p-4 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900">
              Process ID: {process.id}
            </h2>
            <p className="text-md text-gray-600">
              Arrival Time: {process.arrival_time}
            </p>
          </div>
          <div className="bg-blue-100 p-4 rounded-lg flex items-center">
            <Clock className="w-6 h-6 text-blue-500 mr-2" />
            <div>
              <p className="text-sm text-blue-600">Burst Time</p>
              <p className="text-xl font-bold text-blue-800">
                {process.burst_time}
              </p>
            </div>
          </div>
          <div className="bg-green-100 p-4 rounded-lg flex items-center">
            <ArrowRight className="w-6 h-6 text-green-500 mr-2" />
            <div>
              <p className="text-sm text-green-600">Completion Time</p>
              <p className="text-xl font-bold text-green-800">
                {process.completion_time}
              </p>
            </div>
          </div>
          <div className="bg-yellow-100 p-4 rounded-lg flex items-center">
            <Hourglass className="w-6 h-6 text-yellow-500 mr-2" />
            <div>
              <p className="text-sm text-yellow-600">Waiting Time</p>
              <p className="text-xl font-bold text-yellow-800">
                {process.waiting_time}
              </p>
            </div>
          </div>
          <div className="bg-purple-100 p-4 rounded-lg flex items-center">
            <Clock className="w-6 h-6 text-purple-500 mr-2" />
            <div>
              <p className="text-sm text-purple-600">Turnaround Time</p>
              <p className="text-xl font-bold text-purple-800">
                {process.turnaround_time}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function ItemBox({ title, value, className }) {
  return (
    <div className={`flex flex-col ${className}`}>
      <span className="text-xs text-stone-600">{title} </span>
      <span className="text-md">{value}</span>
    </div>
  );
}

ProcessDetailsCard.propTypes = {
  process: PropTypes.object.isRequired,
};

export default ProcessDetailsCard;
