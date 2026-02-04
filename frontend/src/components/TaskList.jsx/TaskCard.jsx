import React from 'react'
import { useContext,useState,useEffect } from 'react'
import { AuthDataContext } from '../../context/AuthContextProvider';



const TaskCard = ({ data }) => {
  const taskstat = useContext(AuthDataContext);
  const [tasklist, setTasklist] = useState(null);

  useEffect(() => {
    if (taskstat) {
      const employee = taskstat.find(elem => elem.name === data);
      setTasklist(employee?.taskCount || null); 
    }
  }, [taskstat, data]);

  if (!tasklist) {
    return <p className="text-center mt-10 text-lg">Loading tasks...</p>;
  }

  return (
    <>
      <div className='border-2 flex justify-flex gap-5 border-amber-400 w-100% flex-wrap items-center'>


           
           
      </div>
    </>
  )
}

export default TaskCard
