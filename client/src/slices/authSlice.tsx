import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
    token: string;
    exp: number;
    uploadUrl: string;
    uploadExp: number;
}

const initialState = JSON.parse(localStorage.getItem('auth')!) as AuthState;

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state: AuthState, action: PayloadAction<{ token: string, exp: number }>) => {
            state.token = action.payload.token;
            state.exp = action.payload.exp;
        },
        setUploadUrl: (state: AuthState, action: PayloadAction<{ uploadUrl: string, uploadExp: number }>) => {
            state.uploadExp = action.payload.uploadExp;
            state.uploadUrl = action.payload.uploadUrl;
        }
    }
});

export const { setAuth } = authSlice.actions

export default authSlice.reducer