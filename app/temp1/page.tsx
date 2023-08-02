"use client";
import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import ButtonComponent from "./ButtonComponent";
import Modal from "react-modal";

type TimerData = {
  name: string;
  startTime: Date | null;
  endTime: Date | null;
  duration: number | null;
};

const App: React.FC = () => {
  const [activeButtons, setActiveButtons] = useState<string[]>([]);
  const [timerData, setTimerData] = useState<TimerData[]>([]);
  const [active, setActive] = useState(false);

  // Modal control state
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [buttonToConfirm, setButtonToConfirm] = useState<string | null>(null);

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
      // const endTime = new Date();
      // setActiveButtons(activeButtons.filter((button) => button !== name));
      // setTimerData((prevData) =>
      //   prevData.map((data) =>
      //     data.name === name
      //       ? {
      //           ...data,
      //           endTime,
      //           duration:
      //             (endTime.getTime() - (data.startTime?.getTime() || 0)) / 1000,
      //         }
      //       : data
      //   )
      // );
      // //   setModalIsOpen(true);
      // // setEndTime(new Date());
      // toast.success(`Timer for ${name} ended.`);
      setButtonToConfirm(name);
      setModalIsOpen(true);
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

  const handleConfirm = () => {
    if (!buttonToConfirm) return;

    const endTime = new Date();

    setTimerData((prevData) =>
      prevData.map((data) =>
        data.name === buttonToConfirm
          ? {
              ...data,
              endTime,
              duration:
                (endTime.getTime() - (data.startTime?.getTime() || 0)) / 1000,
            }
          : data
      )
    );
    setActiveButtons((prev) =>
      prev.filter((button) => button !== buttonToConfirm)
    );
    setModalIsOpen(false);
    toast.success(`Timer for ${buttonToConfirm} ended.`);
  };

  const handleCancel = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl">Select loss criteria</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {buttons.map((name) => (
          <ButtonComponent
            key={name}
            name={name}
            startTime={
              timerData.find((timer) => timer.name === name)?.startTime || null
            }
            endTime={
              timerData.find((timer) => timer.name === name)?.endTime || null
            }
            onClick={() => handleButtonClick(name)}
            isActive={activeButtons.includes(name)}
          />
        ))}
      </div>
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
