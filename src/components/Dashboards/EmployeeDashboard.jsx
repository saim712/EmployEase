import React,{useEffect, useState} from 'react'
import Header from '../Header'
import TaskCard from '../TaskList.jsx/TaskCard'
import TaskList from '../TaskList.jsx/TaskList'

function EmployeeDashboard({data}) {
  const [username, setusername] = useState("guest");
  // console.log(loggedinuserdata.email);
  useEffect(() => {
   
      let loggedinuserdata=JSON.parse(localStorage.getItem("loggedin"))
      if(loggedinuserdata && loggedinuserdata.email){
        setusername(loggedinuserdata.email);
      }
    
  }, [])
  
  return (
    <>
      <div className='w-full h-screen bg-[#dfebdf]'>
        <Header data={username}/>
        <TaskCard/>
        <TaskList/>
      </div>
    </>
  )
}

export default EmployeeDashboard
