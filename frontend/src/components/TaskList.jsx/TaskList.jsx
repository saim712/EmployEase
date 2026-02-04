import React from "react";
import AcceptTask from "./AcceptTask";
import NewTask from "./NewTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";

function TaskList({ tasks, onTaskUpdate }) {

  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center py-20 px-4">
        <p className="text-gray-500 font-bold text-lg">No tasks found in this category.</p>
      </div>
    );
  }

  return (
    <div
      id="tasklist"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-1"
    >
      {tasks.map((elem) => {
        if (elem.status === 'new') {
          return (
            <NewTask
              key={elem._id}
              data={elem}
              onStatusChange={onTaskUpdate}
            />
          );
        }
        if (elem.status === 'active') {
          return (
            <AcceptTask
              key={elem._id}
              data={elem}
              onStatusChange={onTaskUpdate}
            />
          );
        }
        if (elem.status === 'completed') {
          return (
            <CompleteTask
              key={elem._id}
              data={elem}
            />
          );
        }
        if (elem.status === 'failed') {
          return (
            <FailedTask
              key={elem._id}
              data={elem}
            />
          );
        }
        return null;
      })}
    </div>
  );
}

export default TaskList;
