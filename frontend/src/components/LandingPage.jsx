import { useContext, useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { useNavigate } from "react-router-dom";
import { Footer } from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "./UserContext";

export const LandingPage = () => {
    const navigate = useNavigate();
    const {loggedOut, setLoggedOut} = useContext(UserContext);

    useEffect(() => {
        if (loggedOut){
            toast.success("Logged Out!");
            setLoggedOut(false);
        }
    }, [loggedOut])

    return(
        <>
        <div className="min-h-[100vh] relative bg-[#393E46]">
            <Navbar />
            <div className="w-[100%] flex flex-col items-center justify-center py-[7em]">
                <p className="text-[#EEEEEE] font-bold text-[2.5rem] md:text-[3rem] w-[80%] md:w-[60%] text-center">A Simple To Do List That is Useful in Daily Life!</p>
                <p className="text-[#EEEEEE] w-[80%] md:w-[70%] text-center mt-[2em] md:text-[1.5rem]">This is a website for my To-Do list for the forum task. To access it, please login using my binusian email with my NIM as my password. You can also sign up with your personal mail as well!!</p>
                <p className="text-[#EEEEEE] w-[80%] md:w-[70%] text-center mt-[2em] md:text-[1.5rem]">Email: Rafael.anderson@binus.ac.id</p>
                <p className="text-[#EEEEEE] w-[80%] md:w-[70%] text-center md:text-[1.5rem]">Password: 2702255981</p>
                <button className="bg-[#00ADB5] px-4 py-3 w-fit rounded-[10px] text-[#EEEEEE] font-semibold mt-[2em] md:text-[1.2rem] hover:bg-[#008A92] duration-300 cursor-pointer" onClick={() => {navigate("/login")}}>To-Do List</button>
            </div>
            <Footer />
        </div>
        <ToastContainer />
        </>
    );
}