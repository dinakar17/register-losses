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

interface LossButtonsProps {
  timerData: TimerData[];
  setTimerData: React.Dispatch<React.SetStateAction<TimerData[]>>;
}

const LossButtons = ({ timerData, setTimerData }: LossButtonsProps) => {
  const [activeButtons, setActiveButtons] = useState<string[]>([]);
  const [active, setActive] = useState(false);

  // Modal control state
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [buttonToConfirm, setButtonToConfirm] = useState<string | null>(null);

  const buttons = [
    "EQUIPMENT FAILURE",
    "MINOR STOPPAGES",
    "MOTION LOSS",
    "YIELD LOSS",
    "SETUP/ADJ LOSS",
    "SPEED LOSS",
    "LINE ORG LOSS",
    "ENERGY LOSS",
    "TOOL CHANGE LOSS",
    "DEFECT LOSS",
    "LOGISTIC LOSS",
    "START UP LOSS",
    "SHUT DOWN LOSS",
    "MEASURE/ADJ LOSS",
    "MANAGEMENT LOSS",
    "DIE/JIG/TOOL LOSS",
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
    <div className="">
      <h1 className="mb-4 text-2xl">Select Loss Criteria</h1>
      <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-4 gap-4">
        {buttons.map((name) => (
          <div className="w-full" key={name}>
            <ButtonComponent
              name={name}
              startTime={
                timerData.find((timer) => timer.name === name)?.startTime ||
                null
              }
              endTime={
                timerData.find((timer) => timer.name === name)?.endTime || null
              }
              onClick={() => handleButtonClick(name)}
              isActive={activeButtons.includes(name)}
            />
          </div>
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
      <Toaster />
    </div>
  );
};

export default LossButtons;
