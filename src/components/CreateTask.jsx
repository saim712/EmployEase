import React,{useState} from 'react'

function CreateTask() {
  const [taskTitle, setTaskTitle] = useState('')
  const [taskDate, setTaskDate] = useState('')
  const [assignTo, setAssignTo] = useState('')
  const [category, setCategory] = useState('')
  const [taskDescription, setTaskDescription] = useState('')

  const [newTask, setNewTask] = useState({})

  const handleCreateTask=(e)=>{
    e.preventDefault();


    setNewTask({taskTitle,taskDate,category,taskDescription,active:false,newTask:true,failed:false,completed:false})
    const usersData=JSON.parse(localStorage.getItem("employeesData"));
    // console.log(usersData);

      usersData.forEach((elem)=>{
        if(elem.name===assignTo){
          // console.log(elem.name)
          elem.tasks.push(newTask);
          elem.tasks.newTask=elem.tasks.newTask+1;
        }
      })
      console.log(usersData)

    
    setTaskTitle('')
    setTaskDate('')
    setAssignTo('')
    setCategory('')
  }

  return (
    <div className="createTask m-5 p-10 mb-10">
          <form onSubmit={(e)=>handleCreateTask(e)} className="flex justify-evenly w-[80%] m-auto border-2 shadow-[0_0_20px_8px_rgba(16,185,129,0.6)] border-emerald-300 p-4 rounded-md">
            <div className="flex flex-col gap-3 ">
              <div className='w-full'>
                <h1 className="text-[1.2em] font-semibold">Task Title</h1>
                <input
                value={taskTitle}
                onChange={(e)=>setTaskTitle(e.target.value)}
                  type="text"
                  className="border-2 border-gray-700 p-1.5 mt-0.5 bg-slate-100 w-[100%]  rounded-md text-md outline-none"
                  placeholder="Make React Project"
                />
              </div>
              <div>
                <h1 className="text-[1.2em] font-semibold">Date</h1>
                <input
                value={taskDate}
                onChange={(e)=>setTaskDate(e.target.value)}
                  type="taskDate"
                  placeholder='2025-12-24'
                  className=" border-2 border-gray-700 p-1.5 mt-0.5 bg-slate-100 w-[100%]  rounded-md text-md outline-none"
                />
              </div>
              <div>
                <h1 className="text-[1.2em] font-semibold">Assign to</h1>
                <input
                value={assignTo}
                onChange={(e)=>setAssignTo(e.target.value)}
                  type="text"
                  placeholder="employee name"
                  className="border-2 border-gray-700 p-1.5 mt-0.5 bg-slate-100 w-[100%]  rounded-md text-md outline-none"
                />
              </div>
              <div>
                <h1 className="text-[1.2em] font-semibold">Category</h1>
                <input
                value={category}
                onChange={(e)=>setCategory(e.target.value)}
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
                value={taskDescription}
                onChange={(e)=>setTaskDescription(e.target.value)}
              ></textarea>
              <button className="text-md cursor-pointer text-white  bg-emerald-500 p-2 rounded-md ">
                Create Task
              </button>
            </div>
          </form>
        </div>
  )
}

export default CreateTask
