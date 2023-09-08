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
  // const [active, setActive] = useState(false);
  // const [startTime, setStartTime] = useState<Date | null>(null);
  // const [endTime, setEndTime] = useState<Date | null>(null);
  // const [modalIsOpen, setModalIsOpen] = useState(false);

  // const handleClick = () => {
  //   if (active) {
  //     setModalIsOpen(true);
  //   } else {
  //     setStartTime(new Date());
  //     setActive(true);
  //     toast.success(`Timer for ${name} started.`);
  //   }
  // };

  // const handleConfirm = () => {
  //   setEndTime(new Date());
  //   setActive(false);
  //   toast.success(`Timer for ${name} ended.`);
  //   setModalIsOpen(false);
  // };

  // const handleCancel = () => {
  //   setModalIsOpen(false);
  // };
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
    <div className="my-2">
      <button
        onClick={onClick}
        className={`px-4 py-2 rounded-full focus:outline-none ${
          isActive
            ? "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-pulse"
            : "bg-gray-300"
        }`}
      >
        {name}
      </button>
      {isActive && (
        <>
          <p>Start time: {startTime?.toLocaleTimeString()}</p>
          <p>Duration: {duration} seconds</p>
        </>
      )}

      {!isActive && endTime && (
        <>
          <p>Start time: {startTime?.toLocaleTimeString()}</p>
          <p>End time: {endTime?.toLocaleTimeString()}</p>
          <p>Duration: {exactDuration} seconds</p>
        </>
      )}
      {/* <Modal
          isOpen={modalIsOpen}
          onRequestClose={handleCancel}
          contentLabel="Confirmation Modal"
          style={{
            overlay: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            },
            content: {
              position: "relative",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "90%",
              maxWidth: "400px",
              margin: "0 auto",
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "2em",
              border: "none",
              boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
            },
          }}
        >
          <h2 className="mb-6 text-lg font-bold text-center">
            Are you sure it is completely eliminated?
          </h2>
          <div className="flex justify-around w-full">
            <button
              onClick={handleConfirm}
              className="px-6 py-2 mr-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
            >
              Sure
            </button>
            <button
              onClick={handleCancel}
              className="px-6 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
            >
              Continue Timer
            </button>
          </div>
        </Modal> */}
    </div>
  );
};

export default ButtonComponent;
