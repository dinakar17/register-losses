import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";

type ButtonProps = {
  name: string;
  isActive: boolean;
  onClick: () => void;
  startTime: Date | null;
  endTime: Date | null;
};

const ButtonComponent: React.FC<ButtonProps> = ({
  name,
  isActive,
  onClick,
  startTime,
  endTime,
}) => {
  const [duration, setDuration] = useState<number | null>(null);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isActive) {
      intervalId = setInterval(() => {
        setDuration((prev) => (prev ? prev + 1 : 1));
      }, 1000);
    }
    return () => clearInterval(intervalId); // cleanup on unmount
  }, [isActive]);

  // const duration =
  //   startTime && endTime
  //     ? (endTime.getTime() - startTime.getTime()) / 1000
  //     : null;
  const exactDuration = 
      startTime && endTime
        ? (endTime.getTime() - startTime.getTime()) / 1000
        : null;

  return (
    <div className="my-4">
      <button
        onClick={onClick}
        className={`text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 ${
          isActive
            ? "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-pulse"
            : "bg-gray-300"
        }`}
      >
        {name}
      </button>
      {isActive && (
        <div className="text-sm text-center">
          <p>Start time: {startTime?.toLocaleTimeString()}</p>
          <p>Duration: {duration} seconds</p>
        </div>
      )}

      {!isActive && endTime && (
        <div className="text-sm text-center">
          <p>Start time: {startTime?.toLocaleTimeString()}</p>
          <p>End time: {endTime?.toLocaleTimeString()}</p>
          <p>Duration: {exactDuration} seconds</p>
        </div>
      )}
    </div>
  );
};

export default ButtonComponent;
