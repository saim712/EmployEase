import React from "react";

function TaskList() {
  return (
    <>
      <div
        id="tasklist"
        className=" overflow-x-auto flex justify-between gap-7  h-80 my-5 py-1 px-15"
      >
        <div className="card bg-slate-400 text-center text-teal-200 p-6 h-full shrink-0 rounded-sm w-[40%] ">
          <div className="flex justify-between items-center">
            <h2 className="bg-slate-600 p-1 rounded-md">Importance</h2>
            <p className="">Dec 12 2025</p>
          </div>
          <h1 className="mt-5 mb-4 text-3xl font-semibold">Title of what is purpose</h1>
          <p className="text-[1.1em]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque
            dignissimos doloremque quaerat enim at. Ipsa?
          </p>
        </div>
      </div>
    </>
  );
}

export default TaskList;
