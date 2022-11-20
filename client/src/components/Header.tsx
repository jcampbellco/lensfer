import React from 'react';
import { IconCapture, IconUser } from "@tabler/icons";
import { useAppSelector } from "../hooks";

function Header() {
    const user = useAppSelector((state) => state.user);

    const avatar = !!user.iconPath ?
        (<img src={user.iconPath} height={48} width={48} className={"avatar-lg"} />) :
        (<IconUser size={48} className={"avatar-lg"} />);

    return (
        <header className="navbar navbar-expand-md navbar-dark d-print-none">
            <div className="container-xl">
                <div className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
                    <IconCapture size={64} className="" />
                </div>
                <div className="navbar-nav flex-row order-md-last">
                    <div className="nav-item p-">
                        { avatar }
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;