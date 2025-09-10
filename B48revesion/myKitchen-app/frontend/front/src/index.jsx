import React from 'react'
import ReactDom from 'react-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
    <React.StrictMode>
        <Authprovider>
            <BrowserRouter>
            <App />
            </BrowserRouter>
        </Authprovider>
    </React.StrictMode>,

    document.getElementById('root')
);