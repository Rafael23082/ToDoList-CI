import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EditTaskPopUp } from "./EditTaskPopUp";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";

export const TaskContainer = ({ showingCompleted, tasks, setTasks }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [updatedTask, setUpdatedTask] = useState(null);
    const {user, VITE_BACKEND_URL} = useContext(UserContext);

    const changeStatus = async(TaskId, IsCompleted) => {
        const response = await fetch(`${VITE_BACKEND_URL}/api/task/updateTask/${TaskId}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                isCompleted: !IsCompleted
            })
        });

        if(response.ok){
            fetch(`${VITE_BACKEND_URL}/api/task/getUserTasks/${user._id}`)
            .then((response) => response.json())
            .then((data) => {
                setTasks(data);
            })
        }
    }

    const deleteTask = async(TaskId) => {
        const response = await fetch(`${VITE_BACKEND_URL}/api/task/deleteTask/${TaskId}`, {
            method: "DELETE",
            headers: {"Content-Type": "application/json"}
        })

        if (response.ok){
            fetch(`${VITE_BACKEND_URL}/api/task/getUserTasks/${user._id}`)
            .then((response) => response.json())
            .then((data) => {
                setTasks(data);
            })
        }
    }

    return (
        <>
            <div className="flex flex-col gap-[20px]">
                {tasks
                    .filter((task) => task.isCompleted === showingCompleted)
                    .map((task) => (
                        <div key={task.id} className="bg-[#393E46] p-[1em] rounded-[10px]">
                            <div className="flex gap-[10px]">
                                <input type="checkbox" className="cursor-pointer" onChange={() => changeStatus(task._id, task.isCompleted)} checked={task.isCompleted}/>
                                <p className="text-lg">{task.taskName}</p>
                            </div>
                            <div className="flex gap-[20px] mt-[0.5em]">
                                <FontAwesomeIcon icon={faEdit} className="cursor-pointer text-blue-300 hover:text-blue-500 duration-300" onClick={() => {
                                        setIsOpen(true);
                                        setUpdatedTask(task);
                                    }}/>
                                <FontAwesomeIcon className="cursor-pointer text-red-500 hover:text-red-700 duration-300" icon={faTrash} onClick={() => deleteTask(task._id)} />
                            </div>
                        </div>
                    ))}
            </div>
            {isOpen && updatedTask && (
                <EditTaskPopUp isOpen={isOpen} updatingTask={updatedTask} setIsOpen={setIsOpen} setTasks={setTasks} />
            )}
        </>
    );
};