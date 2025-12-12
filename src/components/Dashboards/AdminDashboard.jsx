import React from "react";
import Header from "../Header";
import CreateTask from "../CreateTask";
import AllTasks from "../AllTasks";

function AdminDashboard() {
  return (
    <>
      <div className="h-screen w-full">
        <Header data="Adminn"/>
        <CreateTask />
        <AllTasks/>
      </div>
    </>
  );
}

export default AdminDashboard;
