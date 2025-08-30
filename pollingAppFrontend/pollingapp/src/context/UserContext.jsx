import {createContext, useState} from "react";

export const usercontext = createContext();

export const UserProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const login = () => setIsAuthenticated(true);

    return(
        <usercontext.Provider value = {{ isAuthenticated, login }}>
            {children}
        </usercontext.Provider>
    );
};