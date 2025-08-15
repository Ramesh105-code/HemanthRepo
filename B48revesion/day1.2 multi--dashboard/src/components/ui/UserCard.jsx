import React from "react";

export const UserCard = React.memo(function UserCard({ user }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-2xl bg-white shadow-sm border">
      <img src={user.avatar} alt={user.first_name} className="w-14 h-14 rounded-full" />
      <div>
        <div className="font-semibold">{user.first_name} {user.last_name}</div>
        <div className="text-sm text-gray-500">{user.email}</div>
      </div>
    </div>
  );
});
