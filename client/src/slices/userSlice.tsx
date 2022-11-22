import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface UserState {
    id: string;
    name: string;
    email: string;
    iconPath: string;
    status: 'active'|'inactive';
    createdAt: string;
    updatedAt: string;
}

const initialState = JSON.parse(localStorage.getItem('user')!) as UserState;

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state: UserState, action: PayloadAction<UserState>) => {
            state = {...action.payload};
        }
    }
});

export const { setUser } = userSlice.actions

export default userSlice.reducer