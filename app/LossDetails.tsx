"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

interface User {
  id: number;
  name: string;
  email: string;
}

interface LossDetails {
  loss_detail: string;
}

interface LossDetailsProps {
  lossDetails: string;
  setLossDetails: (lossDetails: string) => void;
}

const LossDetails = ({ lossDetails, setLossDetails }: LossDetailsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  // const [selectedUser, setSelectedUser] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAddButton, setShowAddButton] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [lossDetailsList, setLossDetailsList] = useState<LossDetails[]>([]);
  const [displayLossDetailsList, setDisplayLossDetailsList] = useState<
    LossDetails[]
  >([]);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3000/api/lossdetails"
        );
        setLossDetailsList(response.data.result.rows);
        setDisplayLossDetailsList(response.data.result.rows);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const checkIfUserExists = (user: string) => {
    if (user === "") {
      setShowAddButton(false);
    } else {
      setShowAddButton(
        !displayLossDetailsList.some(
          (lossDetail) => lossDetail.loss_detail === user
        )
      );
    }
  };

  const handleAdd = async () => {
    if (lossDetails === "") return;
    try {
      // console.log(`Adding user with name ${lossDetails}...`);
      const loss_detail = lossDetails;

      const res = axios.post("/api/lossdetails", { loss_detail });

      toast.promise(res, {
        loading: "Adding...",
        success: `Loss Detail: ${lossDetails} added successfully`,
        error: `Error adding Loss Detail: ${lossDetails}`,
      });
    } catch (error) { 
      console.error(error);
      toast.error(`Error adding Loss Detail: ${lossDetails}`);
    }
  };

  const handleDelete = async (lossDetail: LossDetails) => {
    try {
      // console.log(`Deleting user with id ${lossDetail.loss_detail}...`);

      const loss_detail = lossDetail.loss_detail;

      // send delete request to database and provide the loss_detail so that
      const res = axios.delete("/api/lossdetails", { data: { loss_detail } });

      toast.promise(res, {
        loading: "Deleting...",
        success: `Loss Detail: ${lossDetail.loss_detail} deleted successfully`,
        error: `Error deleting Loss Detail: ${lossDetail.loss_detail}`,
      });
    } catch (error) {
      console.error(error);
      toast.error(`Error deleting Loss Detail: ${lossDetail.loss_detail}`);
    }
  };

  useEffect(() => {
    checkIfUserExists(lossDetails);
  }, [lossDetails]);

  useEffect(() => {
    const checkResize = () => {
      if (dropdownRef.current) {
        const dropdownHeight = dropdownRef.current.offsetHeight;
        const windowHeight = window.innerHeight;

        if (dropdownHeight > windowHeight) {
          dropdownRef.current.style.height = `${windowHeight - 50}px`;
        }
      }
    };
    window.addEventListener("resize", checkResize);
    return () => window.removeEventListener("resize", checkResize);
  }, []);

  const filterUsers = (searchText: string) => {
    let updatedList = lossDetailsList.filter((lossDetail) =>
      lossDetail.loss_detail.toLowerCase().includes(searchText.toLowerCase())
    );

    setDisplayLossDetailsList(updatedList);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLossDetails(event.target.value);
    filterUsers(event.target.value);
  };

  return (
    <div className="flex flex-col justify-center w-full px-4 py-2">
      <h2 className="text-2xl py-2">Enter Loss Detail</h2>
      <div
        className="relative w-full"
        ref={dropdownRef}
        style={{ maxHeight: "70vh" }}
      >
        <div className="w-full px-4 py-2 border border-gray-300 rounded-md flex">
          <input
            type="text"
            className="flex-grow focus:outline-none"
            placeholder="Enter a Loss Detail..."
            value={lossDetails}
            onFocus={() => setShowDropdown(true)}
            onChange={handleInputChange}
          />
          {lossDetails && (
            <button
              className="-ml-[26px] focus:outline-none hover:text-red-500 hover:bg-slate-100 rounded-full"
              onClick={() => {
                setLossDetails("");
                setShowDropdown(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
        {showDropdown && (
          <div className="absolute top-12 w-full max-h-60 overflow-y-auto bg-white rounded-md shadow-lg z-10">
            {isLoading ? (
              <div className="h-16 flex items-center justify-center">
                <p>Loading...</p>
              </div>
            ) : (
              displayLossDetailsList.length > 0 &&
              displayLossDetailsList.map((lossDetail) => (
                <div
                  key={lossDetail.loss_detail}
                  className="w-full px-4 py-2 cursor-pointer hover:bg-blue-100 flex justify-between"
                  onClick={() => {
                    setLossDetails(lossDetail.loss_detail);
                    setShowDropdown(false);
                  }}
                >
                  <span
                    onClick={() => {
                      setLossDetails(lossDetail.loss_detail);
                      setShowDropdown(false);
                    }}
                  >
                    {lossDetail.loss_detail}
                  </span>
                  <button
                    className="ml-2 focus:outline-none text-red-500 hover:text-red-700 hover:scale-110 transform transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(lossDetail);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
              ))
            )}
          </div>
        )}
        {showAddButton && lossDetails && (
          <button
            className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-md w-full"
            onClick={handleAdd}
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
};

export default LossDetails;
