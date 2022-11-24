import {CodeResponse} from "@react-oauth/google";
import {AxiosResponse} from "axios";
import {api} from "./api";
import {userSlice, UserState} from "../slices/userSlice";
import {authSlice, AuthState} from "../slices/authSlice";
import store from "../store";

class Auth {
    public create(token: CodeResponse) {
        return api.post<any>('/authenticate', token)
            .then(({ data: { auth, user }}: AxiosResponse<{ auth: AuthState, user: UserState }>) => {
                this.writeAuthToLocalStorage(auth);
                this.writeUserToLocalStorage(user);
                store.dispatch(userSlice.actions.setUser(user));
                store.dispatch(authSlice.actions.setAuth(auth));
                return {user, auth};
            });
    }

    public getUploadUrl(file: File) {
        return api.post<any>('/uploads', {
            filename: file.name,
            size: file.size,
            mimetype: file.type
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
        const auth = localStorage.getItem('auth');
        return auth ? JSON.parse(auth) : null;
    }

    clearLocalStorage(): void {
        localStorage.removeItem('auth');
        localStorage.removeItem('user');
    }
}

export const auth = new Auth();