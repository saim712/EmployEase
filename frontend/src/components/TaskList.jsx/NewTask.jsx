import React from 'react'

const NewTask = ({data}) => {
  return (
    <>
      <div className="card bg-slate-400 text-center text-teal-200 p-6 h-full shrink-0 rounded-sm w-[40%] ">
          <div className="flex justify-between items-center">
            <h2 className="bg-slate-600 p-1 rounded-md">{data.category}</h2>
            <p className="">{data.taskDate}</p>
          </div>
          <h1 className="mt-5 mb-4 text-3xl font-semibold">{data.taskTitle}</h1>
          <p className="text-[1.1em]">
            {data.taskDescription}
          </p>
          <div className='mt-3'>
            <button className='bg-emerald-500 cursor-pointer mx-3  px-2 py-2 text-amber-100 font-semibold rounded '>Accept Task</button>
          </div>
        </div>
        
    </>
  )
}

export default NewTask
