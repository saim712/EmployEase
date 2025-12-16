import React,{useState,useContext,useEffect} from "react";
import { AuthDataContext } from "../../context/AuthContextProvider";
import AcceptTask from "./AcceptTask";
import NewTask from "./NewTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";

function TaskList({data}) {
  const [tasklist, setTasklist] = useState(null);
    
    const taskstat=useContext(AuthDataContext);
    useEffect(() => {
        if(taskstat){
          // console.log("searching for employees")
          // console.log(data)
          const employee = taskstat.find(elem => elem.name === data);
          setTasklist(employee ? employee : null);
        }
      }, [taskstat,data])
        console.log(tasklist)
  return (
    <>
      <div
        id="tasklist"
        className=" overflow-x-auto flex justify-between transition-transform duration-200 translate-x-20 gap-7  h-auto my-5 py-1 px-15"
      >
        {tasklist && tasklist.tasks.map((elem,id)=>{

            if (elem.active) {
              return <AcceptTask key={id} data={elem}/>
            }
            if(elem.failed){
              return <FailedTask key={id} data={elem}/>
            }
             if(elem.completed){
              return <CompleteTask key={id} data={elem}/>
            }
             if(elem.newTak){
              return <NewTask key={id} data={elem}/>
            }
            
          
        })}

      
      </div>
    </>
  );
}

export default TaskList;
