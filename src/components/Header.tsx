import React from "react";
import { UserButton } from "@clerk/clerk-react";
import { useClerk } from "@clerk/clerk-react";

export default function Nav() {
  const { user } = useClerk();

  return (
    <div className="mt-5 flex justify-between mx-5">
      <div className="flex items-center">
        <h1 className="font-bold text-3xl">Dashboard</h1>
      </div>
      <div>
        <div className="bg-white flex items-center gap-5 rounded-3xl border-solid border-2 border-black px-5 py-2">
          <h1 className="text-xl">{user?.firstName}</h1>
          <UserButton />
        </div>
      </div>
    </div>
  );
}
