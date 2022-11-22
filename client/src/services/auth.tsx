import {CodeResponse} from "@react-oauth/google";
import {AxiosResponse} from "axios";
import {api} from "./api";
import {userSlice, UserState} from "../slices/userSlice";
import {authSlice, AuthState} from "../slices/authSlice";

class Auth {
    public create(token: CodeResponse) {
        return api.post<any>('/authenticate', token)
            .then(({ data: { auth, user }}: AxiosResponse<{ auth: AuthState, user: UserState }>) => {
                this.writeAuthToLocalStorage(auth);
                this.writeUserToLocalStorage(user);
                userSlice.actions.setUser(user);
                authSlice.actions.setAuth(auth);
                return {user, auth};
            });
    }

    writeUserToLocalStorage(user: UserState) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    readUserFromLocalStorage(): UserState|null {
        const user = localStorage.getItem('user');

        return null;
    }

    writeAuthToLocalStorage(auth: { token: string, exp: number }) {
        localStorage.setItem('auth', JSON.stringify(auth));
    }

    readAuthFromLocalStorage(): AuthState|null {
        console.log('readAuth');
        const auth = localStorage.getItem('auth');
        return auth ? JSON.parse(auth) : null;
    }

    clearLocalStorage(): void {
        localStorage.removeItem('auth');
        localStorage.removeItem('user');
    }
}

export const auth = new Auth();