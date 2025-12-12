import React from 'react'

function AllTasks() {
  return (
    <>
      <div className='w-full px-[1.3em] h-auto mt-10 bg-zinc-100 '>
        <div id='alltask' className="card px-4 flex mb-2 justify-between items-center  overflow-auto border-2 border-emerald-300 rounded h-15">
            <h1 className='text-xl '>Satti</h1>
            <h2 className='text-[24px]'>Make a React Project</h2>
            <h2 className='font-semibold text-[18px]'>Status</h2>
        </div>
      </div>
    </>
  ) 
}

export default AllTasks
