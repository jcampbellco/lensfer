import React from 'react';
import {IconLogin} from "@tabler/icons";
import {Link} from "react-router-dom";

function IndexPage() {
    return (
        <div className="page-body d-flex flex-column justify-content-center m-0" style={{ height: '100vh' }}>
            <div className="container-xl">
                <Link to="/home" className="btn btn-primary">
                    <IconLogin size={32} className="icon" />
                    Login (Coming Soon)
                </Link>
            </div>
        </div>
    );
}

export default IndexPage;