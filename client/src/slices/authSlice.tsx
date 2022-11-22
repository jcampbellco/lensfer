import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
    token: string;
    exp: number;
}

const initialState = JSON.parse(localStorage.getItem('auth')!) as AuthState;

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state: AuthState, action: PayloadAction<{ token: string, exp: number }>) => {
            state.token = action.payload.token;
            state.exp = action.payload.exp;
        }
    }
});

export const { setAuth } = authSlice.actions

export default authSlice.reducer