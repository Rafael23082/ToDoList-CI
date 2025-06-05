import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faEdit } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "./UserContext";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ProfilePopUp = ({ isOpen, setIsOpen }) => {
    const { user, setUser } = useContext(UserContext);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState(user.password);
    const navigate = useNavigate();
    const {VITE_BACKEND_URL} = useContext(UserContext);

    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);  
    };

    const applyChanges = async() => {
        try{
            const validEmail = isValidEmail(email);
            if (!validEmail){
                return toast.error("Invalid Email Format");
            }

            const response = await fetch(`${VITE_BACKEND_URL}/api/user/updateUser/${user._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
            const data = await response.json();
            if (response.ok) {
                const response2 = await fetch(`${VITE_BACKEND_URL}/api/user/getUserInfo/${user._id}`);
                const data2 = await response2.json();
                setUser(data2);
                toast.success("User Details Changed!");
                setIsOpen(false);
            } else {
                toast.error(data.message);
            }
        }catch(err){
            console.log(err.message);
        }
    }

    const changeValue = (type, value) => {
        if (type === "Email"){
            setEmail(value);
        } else if (type === "Password"){
            setPassword(value);
        }
    }

    if (!isOpen) return null;

    return (
        <>
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-[#222831] p-[2em] rounded-[10px] w-[90%] max-w-[400px] flex flex-col items-center">
                <FontAwesomeIcon
                    icon={faTimes}
                    className="text-[1.5rem] text-[#EEEEEE] right-6 top-4 absolute cursor-pointer"
                    onClick={() => setIsOpen(false)}
                />
                <p className="font-semibold text-[#EEEEEE] text-[2rem] text-center">Profile</p>
                <div className="rounded-full bg-white w-[20%] aspect-[1/1] my-[1em] mx-auto"></div>
                <p className="font-semibold text-[#EEEEEE] text-[1.5rem] text-center">{user.fullName}</p>
                <input className="bg-white rounded-[5px] mt-[1em] px-[1.5em] py-[0.5em]" placeholder="Email" type="text" value={email} onChange={(e) => {changeValue("Email", e.target.value)}} />
                <input className="bg-white rounded-[5px] mt-[1em] px-[1.5em] py-[0.5em]" placeholder="Password" type="password" value={password} onChange={(e) => {changeValue("Password", e.target.value)}} />
                <button className="bg-[#00ADB5] px-5 py-2 rounded-[10px] w-fit hover:bg-[#008A92] duration-300 cursor-pointer mt-[2em] text-white" onClick={() => {applyChanges()}}>Save Changes</button>
            </div>
        </div>
        </>
    );
};