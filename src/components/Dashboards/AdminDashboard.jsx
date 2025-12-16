import React from "react";
import Header from "../Header";
import CreateTask from "../CreateTask";
import AllTasks from "../AllTasks";

function AdminDashboard() {
  return (
    <>
      <div className=" w-full">
        <Header data="Admin"/>
        <CreateTask />
        <AllTasks/>
      </div>
    </>
  );
}

export default AdminDashboard;
