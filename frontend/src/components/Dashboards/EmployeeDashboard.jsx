import React,{useEffect, useState} from 'react'
import Header from '../Header'
import TaskCard from '../TaskList.jsx/TaskCard'
import TaskList from '../TaskList.jsx/TaskList'

function EmployeeDashboard() {
  const [username, setusername] = useState("guest");
  // console.log(loggedinuserdata.email);
  useEffect(() => {
   
      let loggedinuserdata=JSON.parse(localStorage.getItem("loggedin"))
      if(loggedinuserdata && loggedinuserdata.email){
        // setusername(loggedinuserdata.email);
        let email=loggedinuserdata.email;
        // setusername(email.slice(0,email.indexOf("@")));
        setusername(
  loggedinuserdata.email
    .split("@")[0]
    .replace(/^./, char => char.toUpperCase())
);

      }
      
    }, [username])
    // console.log(username)
  
  return (
    <>
      <div className='w-full h-screen bg-[#dfebdf]'>
        <Header data={username}/>
        <TaskCard data={username}/>
        <TaskList data={username}/>
      </div>
    </>
  )
}

export default EmployeeDashboard
