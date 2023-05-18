import React from "react";
import { UserInfo } from "./UserInfo";
import { useSelector } from "react-redux";

export const LeaderBoard = () => {
  const users = Object.values(useSelector((state) => state.users.users) || {});
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="bg-white shadow-md rounded my-6">
        <table className="min-w-max w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Users</th>
              <th className="py-3 px-6 text-left">Answered</th>
              <th className="py-3 px-6 text-left">Created</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {users.map((user, index) => (
              <tr
                key={user.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <UserInfo user={user} />
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {Object.keys(user.answers).length}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {user.questions.length}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
