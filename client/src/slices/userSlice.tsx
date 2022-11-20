import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface UserState {
    id: string;
    name: string;
    email: string;
    iconPath: string;
    status: 'active'|'inactive';
    createdAt: string;
    updatedAt: string;
}

const initialState = {
} as UserState

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state: UserState, action: PayloadAction<any>) => {
            console.log('setUser', action.payload);
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.iconPath = action.payload.iconPath;
            state.status = action.payload.status;
        }
    }
});

export const { setUser } = userSlice.actions

export default userSlice.reducer