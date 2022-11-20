import React from 'react';
import { IconCapture, IconUser } from "@tabler/icons";

function Header() {
    return (
        <header className="navbar navbar-expand-md navbar-dark d-print-none">
            <div className="container-xl">
                <div className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
                    <IconCapture size={64} className="" />
                </div>
                <div className="navbar-nav flex-row order-md-last">
                    <div className="nav-item p-">
                        <IconUser size={48} className="avatar-lg" />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;