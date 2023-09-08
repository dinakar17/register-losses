"use client";
import { useState } from "react";
import Select from "react-select";
import LossButtons from "./LossButtons";
import LossDetails from "./LossDetails";
import LossTable from "./LossTable";

interface TableData {
  lossCriteria: string;
  lossDetail: string;
  time: string;
}

type TimerData = {
  name: string;
  startTime: Date | null;
  endTime: Date | null;
  duration: number | null;
};

export default function EnterLossData() {

  const [timerData, setTimerData] = useState<TimerData[]>([]);
  const [lossDetails, setLossDetails] = useState<string>("");

  return (
    <div className="container mx-auto min-h-screen">
      <div className="text-center p-6 bg-gray-800 text-white">
        <h1 className="text-3xl">Enter LOSS Data</h1>
      </div>
      <div className="grid md:grid-cols-10">
        <div className="md:col-span-5 p-4">
          <LossButtons timerData={timerData} setTimerData={setTimerData} />
        </div>
        <div className="md:col-span-5 p-4">
          <h2 className="text-2xl">Loss Details</h2>
          <LossTable timerData={timerData} setTimerData={setTimerData} lossDetails={lossDetails} />
          
        </div>
      </div>
      <div>
        <LossDetails lossDetails={lossDetails} setLossDetails={setLossDetails} />
      </div>
    </div>
  );
}
