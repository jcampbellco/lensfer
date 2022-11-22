import { auth } from "../services/";
import {Navigate} from "react-router-dom";

function RequireAuth({ children }: { children: JSX.Element }) {
    if (!auth.readAuthFromLocalStorage()) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default RequireAuth