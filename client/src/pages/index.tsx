import React from 'react';
import { CodeResponse, useGoogleLogin } from "@react-oauth/google";
import { IconBrandGoogle, IconCapture } from "@tabler/icons";
import { auth } from "../services";
import { useNavigate } from "react-router-dom";

function IndexPage() {
    const navigate = useNavigate();

    const startLogin = useGoogleLogin({
        flow: 'auth-code',
        ux_mode: 'popup',
        onSuccess: (response: CodeResponse) => {
            auth.create(response).then(_ => {
                navigate('/home');
            });
        }
    });

    return (
        <div className="page-body d-flex flex-column justify-content-center m-0" style={{height: '100vh'}}>
            <div className="container-xl d-flex justify-content-center">
                <div className="d-flex flex-column justify-content-center">
                    <IconCapture size={256} className="pb-4"/>
                    <button className={"btn btn-primary"} onClick={() => startLogin()}>
                        <IconBrandGoogle className="mx-2" />
                        Attempt login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default IndexPage;