import React from 'react';
import { GoogleOAuthProvider } from "@react-oauth/google";

function GoogleOauth({ children }: { children: JSX.Element }) {
    return (
        <GoogleOAuthProvider clientId="538717194089-8rcqbtj341tjm9pd3vou3h20214qurq6.apps.googleusercontent.com">
            { children }
        </GoogleOAuthProvider>
    )
}

export default GoogleOauth;