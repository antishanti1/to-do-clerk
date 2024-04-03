import React from "react";
import { UserButton } from "@clerk/clerk-react";
import { useClerk } from "@clerk/clerk-react";

export default function Nav() {
  const { user } = useClerk();

  return (
    <div>
      <div>
        <h1>Dashboard</h1>
      </div>
      <div>
        <h1>{user?.firstName}</h1>
        <UserButton />
      </div>
    </div>
  );
}
