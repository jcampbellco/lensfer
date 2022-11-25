import '@tabler/core/dist/css/tabler.css';
import { Outlet } from "react-router-dom";

import React, {useEffect} from "react";

import Header from "../components/Header";

type AppProps = {
    hideHeader?: boolean
};

function Layout({ hideHeader }: AppProps) {

    // useEffect(() => {
    //     const script = document.createElement('script');
    //     script.src = "node_modules/@tabler/core/dist/js/tabler.js";
    //     script.async = true;
    //     document.body.appendChild(script);
    //     return () => {
    //         document.body.removeChild(script);
    //     }
    // }, []);

    return (
        <div className="App page">
            { !hideHeader ? <Header /> : '' }
            <div className="page-wrapper">
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
