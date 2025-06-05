import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import { ToastContainer, toast } from "react-toastify";

export const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user, setUser, userSuddenlyLoggedOut, setUserSuddenlyLoggedOut, VITE_BACKEND_URL } = useContext(UserContext); 

    console.log(VITE_BACKEND_URL);
    useEffect(() => {
        if (user){
            navigate("/todo");
        }

        if (userSuddenlyLoggedOut){
            toast.error("User is logged out!");
            setUserSuddenlyLoggedOut(false);
        }
    }, [user])

    const updateText = (value, emailText) => {
        if (emailText) {
            setEmail(value);
        } else{
            setPassword(value);
        }
    };

    const login = async() => {
        try{
            const response = await fetch(`${VITE_BACKEND_URL}/api/user/login`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();
            if (!response.ok){
                toast.error(data.message);
            } else {
                setUser(data);
            }
        }catch(err){
            alert(err);
        }
    }

    return (
        <>
        <div className="w-[100%] h-[100vh] flex justify-center items-center bg-[#393E46]">
            <button className="bg-[#00ADB5] px-5 py-2 rounded-[10px] w-fit hover:bg-[#008A92] duration-300 cursor-pointer absolute top-0 left-0 m-[2em] text-[#EEEEEE]" onClick={() => navigate("/")}>Home</button>
            <div className="px-[2em] md:px-[10em] py-[4em] md:bg-[#222831] rounded-[20px] flex flex-col items-center justify-center">
                <p className="text-[#EEEEEE] font-medium text-[2rem] text-center">User Login</p>
                <input type="text" placeholder="Email" className="bg-[#EEEEEE] py-[0.5em] mt-[2em] rounded-[10px] pl-[1em] w-full max-w-[300px]" onChange={(e) => updateText(e.target.value, true)} value={email} />
                <input type="password" placeholder="Password" className="bg-[#EEEEEE] py-[0.5em] mt-[1em] rounded-[10px] pl-[1em] w-full max-w-[300px]" onChange={(e) => updateText(e.target.value, false)} value={password} />
                <p className="text-[#00ADB5] mt-[1em] text-center cursor-pointer hover:underline text-[1.2rem]" onClick={() => navigate("/signup")}>Don't have an account yet? Sign Up!</p>
                <button className="bg-[#00ADB5] px-4 py-3 w-fit rounded-[10px] text-[#EEEEEE] font-semibold mt-[1em] hover:bg-[#008A92] duration-300 cursor-pointer" onClick={login}>Login</button>
            </div>
        </div>
        <ToastContainer />
        </>
    );
};