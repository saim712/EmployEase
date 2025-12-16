import React, { useEffect,useContext,useState } from 'react'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboards/EmployeeDashboard'
import AdminDashboard from './components/Dashboards/AdminDashboard'
import { getEmployeeData,getAdminData,setAdminData,setEmployeeData } from './utils/localStorage'
import {Routes,Route, useNavigate} from 'react-router-dom' 
import NotFound from './components/NotFound'

const App = () => {
  const [checkloginstatus, setcheckloginstatus] = useState(false);
  const navigate=useNavigate();
  useEffect(() => {
      
    // localStorage.clear();
    setEmployeeData()
    setAdminData()
    var status=localStorage.getItem("loggedin")
    if(status){
      setcheckloginstatus(true)
      navigate('/employ');
    }

  }, [])
  

  return (
    <>
   <div className='overflow-hidden'>
     <Routes >

    <Route element={<Login/>} path='/'/>
    <Route element={<AdminDashboard />} path='/admin'/>
    <Route element={<EmployeeDashboard />} path='/employ'/>
    <Route element={<NotFound/>} path='*'/>
    </Routes>
   </div>
    </>
  )
}

export default App
