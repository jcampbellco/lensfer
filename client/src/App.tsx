import './App.css';
import '@tabler/core/dist/css/tabler.css';
import { Outlet } from "react-router-dom";

import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

import Header from "./components/Header";

type AppProps = {
    hideHeader?: boolean
};

function App({ hideHeader }: AppProps) {
    return (
        <GoogleOAuthProvider clientId="538717194089-8rcqbtj341tjm9pd3vou3h20214qurq6.apps.googleusercontent.com">
            <div className="App page">
            { !hideHeader ? <Header /> : '' }
                <div className="page-wrapper">
                    <Outlet />
                </div>
            </div>
        </GoogleOAuthProvider>
    );
}

export default App;
