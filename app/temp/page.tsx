"use client";
import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Modal from "react-modal";

type ButtonProps = {
  name: string;
};

type TimerData = {
  name: string;
  startTime: Date | null;
  endTime: Date | null;
  duration: number | null;
};

const ButtonComponent: React.FC<ButtonProps> = ({ name }) => {
  const [active, setActive] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleClick = () => {
    if (active) {
      setModalIsOpen(true);
    } else {
      setStartTime(new Date());
      setActive(true);
      toast.success(`Timer for ${name} started.`);
    }
  };

  const handleConfirm = () => {
    setEndTime(new Date());
    setActive(false);
    toast.success(`Timer for ${name} ended.`);
    setModalIsOpen(false);
  };

  const handleCancel = () => {
    setModalIsOpen(false);
  };

  const duration =
    startTime && endTime
      ? (endTime.getTime() - startTime.getTime()) / 1000
      : null;

  return (
    <div className="my-4">
      <button
        onClick={handleClick}
        className={`px-4 py-2 rounded-full focus:outline-none ${
          active
            ? "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-pulse"
            : "bg-gray-300"
        }`}
      >
        {name}
      </button>
      {active && <p>Start time: {startTime?.toLocaleTimeString()}</p>}
      {!active && endTime && (
        <>
          <p>Start time: {startTime?.toLocaleTimeString()}</p>
          <p>End time: {endTime?.toLocaleTimeString()}</p>
          <p>Duration: {duration} seconds</p>
        </>
      )}
      <Modal
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
      </Modal>
    </div>
  );
};

const App: React.FC = () => {
  const [activeButtons, setActiveButtons] = useState<string[]>([]);
  const [timerData, setTimerData] = useState<TimerData[]>([]);

  const buttons = [
    "Button1",
    "Button2",
    "Button3",
    "Button4",
    "Button5",
    "Button6",
    "Button7",
    "Button8",
  ];

  const handleButtonClick = (name: string) => {
    if (activeButtons.includes(name)) {
      setActiveButtons(activeButtons.filter((button) => button !== name));
      const endTime = new Date();
      setTimerData((prevData) =>
        prevData.map((data) =>
          data.name === name
            ? {
                ...data,
                endTime,
                duration:
                  (endTime.getTime() - (data.startTime?.getTime() || 0)) / 1000,
              }
            : data
        )
      );
      toast.success(`Timer for ${name} ended.`);
    } else {
      if (activeButtons.length < 2) {
        setActiveButtons([...activeButtons, name]);
        setTimerData([
          ...timerData,
          { name, startTime: new Date(), endTime: null, duration: null },
        ]);
        toast.success(`Timer for ${name} started.`);
      } else {
        toast.error("You can activate only two buttons at a time!");
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl">Select loss criteria</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {buttons.map((name) => (
          <ButtonComponent
            key={name}
            name={name}
            // onClick={() => handleButtonClick(name)}
            // active={activeButtons.includes(name)}
          />
        ))}
      </div>
      <div className="mt-8">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Start Time</th>
              <th className="px-4 py-2">End Time</th>
              <th className="px-4 py-2">Duration</th>
            </tr>
          </thead>
          <tbody>
            {timerData.map(({ name, startTime, endTime, duration }) => (
              <tr key={name}>
                <td className="px-4 py-2">{name}</td>
                <td className="px-4 py-2">
                  {startTime?.toLocaleTimeString() || "-"}
                </td>
                <td className="px-4 py-2">
                  {endTime?.toLocaleTimeString() || "-"}
                </td>
                <td className="px-4 py-2">
                  {duration ? `${duration} seconds` : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Toaster />
    </div>
  );
};

export default App;
