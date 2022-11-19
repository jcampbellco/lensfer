import './App.css';
import '@tabler/core/dist/css/tabler.css';
import { Outlet } from "react-router-dom";

import React from "react";

import Header from "./components/Header";

function App({ hideHeader }) {
    return (<div className="App page">
        { !!!hideHeader ? <Header /> : '' }
        <div className="page-wrapper">
            <Outlet />
        </div>
    </div>);
}

export default App;
