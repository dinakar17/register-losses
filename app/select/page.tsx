"use client";

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
  email: string;
}

const Dropdown: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [displayUsers, setDisplayUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAddButton, setShowAddButton] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setUsers(data);
        setDisplayUsers(data);
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
        !users.some(({ name }) => name.toLowerCase() === user.toLowerCase())
      );
    }
  };

  const handleDelete = async (user: User) => {
    console.log(`Deleting user with id ${user.id}...`);

    // Simulating a DELETE request:
    // Please replace this with actual API call for deleting user.
    // await axios.delete(`https://your-api-endpoint.com/users/${user.id}`);

    console.log(`User with id ${user.id} deleted.`);
  };

  useEffect(() => {
    checkIfUserExists(selectedUser);
  }, [selectedUser]);

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
    let updatedList = users.filter((user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setDisplayUsers(updatedList);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedUser(event.target.value);
    filterUsers(event.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div
        className="relative w-64"
        ref={dropdownRef}
        style={{ maxHeight: "70vh" }}
      >
        <div className="w-full px-4 py-2 border border-gray-300 rounded-md flex">
          <input
            type="text"
            className="flex-grow focus:outline-none"
            placeholder="Select a user..."
            value={selectedUser}
            onFocus={() => setShowDropdown(true)}
            onChange={handleInputChange}
          />
          {selectedUser && (
            <button
              className="-ml-[26px] focus:outline-none hover:text-red-500 hover:bg-slate-100 rounded-full"
              onClick={() => setSelectedUser("")}
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
              displayUsers.map((user) => (
                <div
                  key={user.id}
                  className="w-full px-4 py-2 cursor-pointer hover:bg-blue-100 flex justify-between"
                >
                  <span
                    onClick={() => {
                      setSelectedUser(user.name);
                      setShowDropdown(false);
                    }}
                  >
                    {user.name}
                  </span>
                  <button
                    className="ml-2 focus:outline-none text-red-500 hover:text-red-700 hover:scale-110 transform transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(user);
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
      </div>

      {showAddButton && selectedUser && (
        <button className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-md">
          Add
        </button>
      )}
    </div>
  );
};

export default Dropdown;
