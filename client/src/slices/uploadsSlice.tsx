import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface UploadState {
    id: string;
    key: string;
    createdAt: string;
    updatedAt: string;
}

const initialState: UploadState[] = [];

export const uploadsSlice = createSlice({
    name: 'uploads',
    initialState,
    reducers: {
        addUploads: (state: UploadState[], action: PayloadAction<UploadState[]>) => {
            action.payload.forEach((upload: UploadState) => {
                let index = state.findIndex(u => u.id === upload.id);
                index === -1 ? state.push(upload) : state[index] = upload;
            })
        }
    }
});

export const { addUploads } = uploadsSlice.actions

export default uploadsSlice.reducer