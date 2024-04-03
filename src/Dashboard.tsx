import React from "react";
import Header from "./components/Header";
import Menu from "./components/Menu";
import DailyTasks from "./components/DailyTasks";

export default function Dashboard() {
  return (
    <main className="bg-gray-200  p-5 w-full">
      <div className="flex bg-gray-50 h-[100%] rounded-xl p-5 ">
        <Menu />
        <div className="w-full">
          <Header />
          <div className="flex bg-white h-screen rounded-xl p-5 mt-5">
            <DailyTasks />
          </div>
        </div>
      </div>
    </main>
  );
}
