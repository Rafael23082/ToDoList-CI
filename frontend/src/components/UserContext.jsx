import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [userSuddenlyLoggedOut, setUserSuddenlyLoggedOut] = useState(false);
    const [loggedOut, setLoggedOut] = useState(false);
    const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

    return(
        <UserContext.Provider value={{user, setUser, userSuddenlyLoggedOut, setUserSuddenlyLoggedOut, loggedOut, setLoggedOut, VITE_BACKEND_URL}}>
            {children}
        </UserContext.Provider>
    );
}