import { useState, useEffect, useContext } from "react";
import { TaskContainer } from "./TasksContainer";
import { useNavigate } from "react-router-dom";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProfilePopUp } from "./ProfilePopUp";
import { UserContext } from "./UserContext";
import { ToastContainer, toast } from "react-toastify";

export const ToDoWrapper = () => {
    const [task, setTask] = useState("");
    const [showingCompleted, setShowingCompleted] = useState(false);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [tasks, setTasks] = useState([]);
    const {user, setUser, setUserSuddenlyLoggedOut, loggedOut, setLoggedOut, VITE_BACKEND_URL} = useContext(UserContext);

    useEffect(() => {
        if (!user && !loggedOut){
            setUserSuddenlyLoggedOut(true);
            navigate("/login");
            return;
        }

        if (loggedOut){
            navigate("/");
            return;
        }

        console.log(user)
        fetch(`${VITE_BACKEND_URL}/api/task/getUserTasks/${user._id}`)
        .then((response) => response.json())
        .then((data) => {
            setTasks(data);
        })
    }, [user])

    const addTask = async() => {
        const response = await fetch(`${VITE_BACKEND_URL}/api/task`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                taskName: task,
                userId: user._id
            })
        })
        if (response.ok){
            setTask("");
            fetch(`${VITE_BACKEND_URL}/api/task/getUserTasks/${user._id}`)
            .then((response) => response.json())
            .then((data) => {
                setTasks(data);
            })
        } else {
            const data = await response.json();
            toast.error(data.message);
        }
    };

    const logout = () => {
        setLoggedOut(true);
        setUser(null);
    };

    return (
        <>
            <ToastContainer />
            <div className="w-[100%] min-h-[100vh] flex items-center justify-center bg-[#393E46] text-[#EEEEEE]">
                <div className="h-auto px-[5em] shadow-2xl rounded-[20px] flex flex-col max-w-[1200px] bg-[#222831] pb-[2em] relative">
                    <FontAwesomeIcon icon={faUserCircle} className="absolute text-[#EEEEEE] right-0 text-[2rem] mr-[1em] sm:mr-[2em] mt-[1.1em] cursor-pointer" onClick={() => setIsOpen(true)}/>
                    <button className="bg-red-500 px-5 py-2 rounded-[10px] w-fit hover:bg-red-700 duration-300 cursor-pointer absolute top-0 right-0 mr-[5.5em] sm:mr-[7.5em] mt-[2em]" onClick={logout}>Logout</button>
                    <p className="font-medium text-3xl text-center mt-[4em]">To Do List</p>
                    <div className="flex justify-center gap-[40px] mt-[2em] sm:flex-row items-center flex-col">
                        <input type="text" placeholder="Add Task" className="bg-gray-200 rounded-[10px] pl-[1em] py-2 w-fit text-black" onChange={(e) => setTask(e.target.value)} value={task}/>
                        <button className="bg-[#00ADB5] px-5 py-2 rounded-[10px] w-fit hover:bg-[#008A92] duration-300 cursor-pointer" onClick={addTask}>Add Task</button>
                        <button className="bg-[#00ADB5] px-5 py-2 rounded-[10px] w-fit hover:bg-[#008A92] duration-300 cursor-pointer" onClick={() => setShowingCompleted(!showingCompleted)}>{showingCompleted ? "Show Uncompleted" : "Show Completed"}</button>
                    </div>
                    <div className="h-[210px] w-[calc(100%+10em)] -mx-[5em] sm:w-full sm:-mx-0 mt-[2em] overflow-y-auto px-[1em]" style={{scrollbarWidth: "thin", scrollbarColor: "#ccc transparent"}}>
                        <TaskContainer showingCompleted={showingCompleted} tasks={tasks} setTasks={setTasks} />
                    </div>
                </div>
            </div>
            {isOpen && <ProfilePopUp isOpen={isOpen} setIsOpen={setIsOpen} />}
        </>
    );
};