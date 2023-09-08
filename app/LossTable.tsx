import axios from "axios";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

type TimerData = {
  name: string;
  startTime: Date | null;
  endTime: Date | null;
  duration: number | null;
};

interface LossTableProps {
  timerData: TimerData[];
  setTimerData: (timerData: TimerData[]) => void;
  lossDetails: string;
}

const LossTable = ({ timerData, setTimerData, lossDetails }: LossTableProps) => {
  const deleteRow = (name: string) => {
    const newData = [...timerData];
    const index = newData.findIndex((row) => row.name === name);
    newData.splice(index, 1);
    setTimerData(newData);
  };

  const handleSubmit = () => {
    if (timerData.length === 0) {
      toast.error("Please enter at least one loss data.");
      return;
    }
    if (lossDetails === "") {
      toast.error("Please enter loss details.");
      return;
    }
   // send the data in an array where each element is an object with the following keys: loss_criteria, loss_detail, start_time, end_time, duration
    // e.g. [{loss_criteria: "Downtime", loss_detail: "No power", start_time: "2021-10-01 08:00:00", end_time: "2021-10-01 08:30:00", duration: 1800}]
    const lossData = timerData.map(({ name, startTime, endTime, duration }) => ({
      loss_criteria: name,
      loss_details: lossDetails,
      start_time: startTime?.toLocaleString(),
      end_time: endTime?.toLocaleString(),
      duration: duration
    }));

    // convert lossData to JSON and send to backend
    const res = axios.post("http://localhost:3000/api/lossdata", lossData);


    toast.promise(res, {
      loading: "Submitting loss data...",
      success: "Loss data submitted successfully.",
      error: "Error submitting loss data.",
    })
  };

  const handleReset = () => {
    setTimerData([]);
  };


  return (
    <div>
      <table className="w-full table-auto text-center">
        <thead>
          <tr>
            <th className="px-4 py-2">Loss Criteria</th>
            <th className="px-4 py-2">Loss Detail</th>
            <th className="px-4 py-2">Start Time</th>
            <th className="px-4 py-2">End Time</th>
            <th className="px-4 py-2">Duration</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {timerData.map(({ name, startTime, endTime, duration }) => (
            <tr key={name}>
              <td className="px-4 py-2">{name}</td>
              <td className="px-4 py-2">{lossDetails}</td>
              <td className="px-4 py-2">
                {startTime?.toLocaleTimeString() || "-"}
              </td>
              <td className="px-4 py-2">
                {endTime?.toLocaleTimeString() || "-"}
              </td>
              <td className="px-4 py-2">
                {duration ? `${duration} seconds` : "-"}
              </td>
              <td className="px-4 py-2">
                <button onClick={() => deleteRow(name)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex mt-4 gap-2">
        <button
        onClick={handleSubmit}
        className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
          Submit
        </button>
        <button 
        onClick={handleReset}
        className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
          Reset
        </button>
      </div>
      <Toaster/>
    </div>
  );
};

export default LossTable;
