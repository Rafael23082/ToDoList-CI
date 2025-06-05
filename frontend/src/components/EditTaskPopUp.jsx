import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { toast } from "react-toastify";

export const EditTaskPopUp = ({ isOpen, updatingTask, setIsOpen, setTasks }) => {
    const [updatedTaskText, setUpdatedTaskText] = useState(updatingTask.taskName);
    const {user, VITE_BACKEND_URL} = useContext(UserContext);

    const updateTask = async () => {
        const response = await fetch(`${VITE_BACKEND_URL}/api/task/updateTask/${updatingTask._id}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                taskName: updatedTaskText
            })
        })

        if (response.ok){
            fetch(`${VITE_BACKEND_URL}/api/task/getUserTasks/${user._id}`)
            .then((response) => response.json())
            .then((data) => {
                setTasks(data);
            })
            toast.success("Task Updated!");
            setIsOpen(false);
        }
    };

    return (
        isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-[#222831] p-[2em] rounded-[10px]">
                    <input type="text" value={updatedTaskText} onChange={(e) => setUpdatedTaskText(e.target.value)} className="bg-gray-200 rounded-[10px] pl-[1em] py-2 w-full text-black" />
                    <div className="flex gap-[20px] mt-[1em]">
                        <button className="bg-[#00ADB5] px-5 py-2 rounded-[10px] w-fit hover:bg-[#008A92] duration-300 cursor-pointer" onClick={updateTask}>Update</button>
                        <button className="bg-red-500 px-5 py-2 rounded-[10px] w-fit hover:bg-red-700 duration-300 cursor-pointer" onClick={() => setIsOpen(false)}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    );
};