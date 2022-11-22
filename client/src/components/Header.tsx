import React from 'react';
import {IconCapture, IconLogout, IconUser} from "@tabler/icons";
import { useAppSelector } from "../hooks";
import { auth } from "../services";

function Header() {
    const user = useAppSelector((state) => state.user);

    if (!user) {
        return (<></>)
    }

    const avatar = !!user.iconPath ?
        (<img src={user.iconPath} height={48} width={48} className={"avatar-lg"} alt={"User Avatar"} />) :
        (<IconUser size={48} className={"avatar-lg"} />);

    const logout = () => {
        auth.clearLocalStorage();
        window.location.reload();
    }

    return (
        <header className="navbar navbar-expand-md navbar-dark d-print-none">
            <div className="container-xl">
                <div className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
                    <IconCapture size={64} className="" />
                </div>
                <div className="navbar-nav flex-row order-md-last">
                    <button onClick={logout} className="btn btn-outline mx-4">
                        <IconLogout size={32} className="" />
                        Logout
                    </button>
                    <div className="nav-item p-">
                        { avatar }
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;