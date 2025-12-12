import React from 'react'

function CreateTask() {
  return (
    <div className="createTask m-5 p-10 mb-10">
          <form className="flex justify-evenly w-[80%] m-auto border-2 shadow-[0_0_20px_8px_rgba(16,185,129,0.6)] border-emerald-300 p-4 rounded-md">
            <div className="flex flex-col gap-3 ">
              <div className='w-full'>
                <h1 className="text-[1.2em] font-semibold">Task Title</h1>
                <input
                  type="text"
                  className="border-2 border-gray-700 p-1.5 mt-0.5 bg-slate-100 w-[100%]  rounded-md text-md outline-none"
                  placeholder="Make React Project"
                />
              </div>
              <div>
                <h1 className="text-[1.2em] font-semibold">Date</h1>
                <input
                  type="date"
                  className=" border-2 border-gray-700 p-1.5 mt-0.5 bg-slate-100 w-[100%]  rounded-md text-md outline-none"
                />
              </div>
              <div>
                <h1 className="text-[1.2em] font-semibold">Assign to</h1>
                <input
                  type="text"
                  placeholder="employee name"
                  className="border-2 border-gray-700 p-1.5 mt-0.5 bg-slate-100 w-[100%]  rounded-md text-md outline-none"
                />
              </div>
              <div>
                <h1 className="text-[1.2em] font-semibold">Category</h1>
                <input
                  type="text"
                  className="border-2 border-gray-700 p-1.5 mt-0.5 bg-slate-100 w-[100%]  rounded-md text-md outline-none"
                  placeholder="development,design,ui/ux"
                />
              </div>
            </div>
            <div className=" w-[500px] flex flex-col gap-4" >
              <h1 className="text-[1.2em] font-semibold">Description</h1>
              <textarea
                name=""
                className="w-full h-55 px-4 rounded outline-none p-2 text-md bg-gray-100"
                id=""
              ></textarea>
              <button className="text-md text-white  bg-emerald-500 p-2 rounded-md ">
                Create Task
              </button>
            </div>
          </form>
        </div>
  )
}

export default CreateTask
