import React from "react";

export const UserInfo = ({ user }) => {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0 h-12 w-12">
        <img
          className="h-full w-full rounded-full"
          src={user.avatarURL}
          alt={`${user.id}'s avatar`}
        />
      </div>
      <div className="ml-4">
        <div className="text-lg font-medium text-gray-900">{user.name}</div>
        <div className="text-gray-600">ID: {user.id}</div>
      </div>
    </div>
  );
};
