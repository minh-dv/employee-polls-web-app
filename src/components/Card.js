import React from "react";
import { Link } from "react-router-dom";

export const Card = ({ data, title }) => {
  return (
    <div className="border-2 bg-white rounded-lg shadow-md">
      <div className="text-2xl font-medium text-gray-800 px-4 py-2 text-center">
        {title}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-lg shadow-md text-center"
          >
            <div className="text-md font-medium text-gray-800 px-4 py-2">
              {item.author}
            </div>
            <div className="text-sm text-gray-600 px-4 py-2">
              {new Date(item.timestamp).toDateString()}
            </div>
            <Link to={"poll/" + item.id}>
              <button className="border border-green-500 text-green-500 hover:bg-green-500 hover:text-white py-1 px-2 rounded-lg mx-4 my-2 w-70">
                Show Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
