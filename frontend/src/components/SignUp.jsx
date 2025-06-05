import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "./UserContext";

export const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {VITE_BACKEND_URL} = useContext(UserContext);

    const updateText = (value, type) => {
        if (type === "name"){
            setName(value);
        } else if (type === "email"){
            setEmail(value);
        } else setPassword(value);
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const verifyUser = async () => {
        const validEmail = isValidEmail(email);
        if (!validEmail) {
            return toast.error("Email Invalid")
        }

        const response = await fetch(`${VITE_BACKEND_URL}/api/user`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                fullName: name,
                email: email,
                password: password
            })
        })

        const data = await response.json();
        if (!response.ok){
            toast.error(data.message);
        } else {
            setName("");
            setEmail("");
            setPassword("");
            toast.success("User Created!");
        }
    };

    return (
        <>
        <ToastContainer />
        <div className="w-[100%] h-[100vh] flex justify-center items-center bg-[#393E46]">
            <button className="bg-[#00ADB5] px-5 py-2 rounded-[10px] w-fit hover:bg-[#008A92] duration-300 cursor-pointer absolute top-0 left-0 m-[2em] text-[#EEEEEE]" onClick={() => navigate("/")}>Home</button>
            <div className="px-[2em] md:px-[10em] py-[4em] md:bg-[#222831] rounded-[20px] flex flex-col items-center justify-center">
                <p className="text-[#EEEEEE] font-medium text-[2rem]">User Sign Up</p>
                <input type="text" placeholder="Full Name" value={name} onChange={(e) => updateText(e.target.value, "name")} className="bg-[#EEEEEE] py-[0.5em] mt-[2em] w-full max-w-[300px] rounded-[10px] pl-[1em]" />
                <input type="text" placeholder="Email" value={email} onChange={(e) => updateText(e.target.value, "email")} className="bg-[#EEEEEE] py-[0.5em] mt-[1em] w-full max-w-[300px] rounded-[10px] pl-[1em]" />
                <input type="password" placeholder="Password" value={password} onChange={(e) => updateText(e.target.value, "password")} className="bg-[#EEEEEE] py-[0.5em] mt-[1em] w-full max-w-[300px] rounded-[10px] pl-[1em]"/>
                <p className="text-[#00ADB5] mt-[1em] text-center cursor-pointer hover:underline text-[1.2rem]" onClick={() => navigate("/login")} >Already have an account? Log In.</p>
                <button className="bg-[#00ADB5] px-4 py-3 w-fit rounded-[10px] text-[#EEEEEE] font-semibold mt-[1em] hover:bg-[#008A92] duration-300 cursor-pointer" onClick={verifyUser} >Sign Up</button>
            </div>
        </div>
        </>
    );
};