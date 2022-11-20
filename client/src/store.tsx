import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from "./slices/authSlice";
import { userSlice } from "./slices/userSlice";

export default configureStore({
    reducer: {
        auth: authSlice.reducer,
        user: userSlice.reducer,
    },
})