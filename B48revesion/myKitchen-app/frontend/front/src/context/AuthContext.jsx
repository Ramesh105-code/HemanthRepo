import {createContext, useState,useContext} from'react';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [ token, setToken] = useState(localStorage.getItem('token'));

    const loginUser = (tok) => {

        localStorage.setItem('token',tok);
        setToken(tok);
    };

    return (
        <AuthContext.Provider value = {{ token, loginUser,logoutUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);