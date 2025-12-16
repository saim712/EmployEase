import React, { useContext, useState, useEffect } from "react";
import { AuthDataContext } from "../context/AuthContextProvider";

function AllTasks() {
  const authdata = useContext(AuthDataContext);

  // Check if authdata exists and is an array
  if (!authdata || !Array.isArray(authdata)) {
    return (
      <div>
        Loading data or no data available...
        {/* {console.log(authdata)} */}
      </div>
    );
  }

  return (
    <>
      {/* <div className='w-full overflow-auto px-[1.3em] border-4 border-blue-500 h-auto mt-10 bg-zinc-100 '> */}
      <div className="w-full overflow-y-auto px-[1.3em]  h-[80vh] mt-4 bg-zinc-100">
        <div
          id="alltask"
          className="card px-4 flex mb-4 justify-between items-center  overflow-auto border-2 border-emerald-300 rounded h-15"
        >
          <h1 className="text-xl  w-1/5">Employee Name</h1>
          <h2 className="font-semibold text-[18px] w-1/5">New Task</h2>
          <h2 className="font-semibold text-[18px] w-1/5">Active Task</h2>
          <h2 className="font-semibold text-[18px] w-1/5">Completed</h2>
          <h2 className="font-semibold text-[18px] w-1/5">Failed</h2>
        </div>

        {authdata.map((elem, idx) => {
          return (
            <div
              key={idx}
              id="alltask"
              className="card px-4 flex mb-4  justify-between items-center  overflow-auto border-2 border-emerald-300 rounded h-15"
            >
              <h1 className="text-xl  w-1/5">{elem.name}</h1>
              <h2 className="font-semibold text-[18px] w-1/5">
                {elem.taskCount.newTask}
              </h2>
              <h2 className="text-xl w-1/5">{elem.taskCount.active}</h2>
              <h2 className="font-semibold text-xl w-1/5">
                {elem.taskCount.completed}
              </h2>
              <h2 className="font-semibold text-[18px] w-1/5">
                {elem.taskCount.failed}
              </h2>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default AllTasks;
