"use client";
import { useState } from "react";
import Select from "react-select";

interface TableData {
  lossCriteria: string;
  lossDetail: string;
  time: string;
}

export default function EnterLossData() {
  const [data, setData] = useState<TableData[]>([
    { lossCriteria: "Dummy1", lossDetail: "Detail1", time: "12:00 AM" },
    { lossCriteria: "Dummy2", lossDetail: "Detail2", time: "1:00 AM" },
  ]);

  const deleteRow = (index: number) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
  };

  const buttonArray = [
    "Button1",
    "Button2",
    "Button3",
    "Button4",
    "Button5",
    "Button6",
    "Button7",
    "Button8",
  ];

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center p-6 bg-gray-800 text-white">
        <div></div>
        <div className="text-center">
          <h1 className="text-2xl">Enter Loss Data</h1>
        </div>
        <div>
          <button className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded">
            Edit loss details
          </button>
        </div>
      </div>
      <div className="grid md:grid-cols-10 min-h-screen">
        <div className="md:col-span-7 bg-blue-200 p-4">
          <div>
            <h2 className="text-2xl">Select Loss criteria</h2>
            <div className="grid grid-cols-2 gap-4">
              {buttonArray.map((button, index) => (
                <button
                  key={index}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  {button}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl">Enter Loss Detail</h2>
            <Select />
          </div>
        </div>
        <div className="md:col-span-3 bg-red-200 p-4">
          <h2 className="text-2xl">Loss Details</h2>
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th>Loss Criteria</th>
                <th>Loss Detail</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  <td>{row.lossCriteria}</td>
                  <td>{row.lossDetail}</td>
                  <td>{row.time}</td>
                  <td>
                    <button onClick={() => deleteRow(index)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
              Submit
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Reset
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
}
