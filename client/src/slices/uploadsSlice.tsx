import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface PresignedUrlState {
    url: string;
    exp: number;
    expIn: number;
    headers: string[];
}

export interface UploadState {
    id: string;
    key: string;
    createdAt: string;
    updatedAt: string;
    url: PresignedUrlState;
}

const initialState: UploadState[] = [];

export const uploadsSlice = createSlice({
    name: 'uploads',
    initialState,
    reducers: {
        addUploads: (state: UploadState[], action: PayloadAction<UploadState|UploadState[]>) => {
            const uploads = Array.isArray(action.payload) ? action.payload : [action.payload];
            uploads.forEach((upload: UploadState) => {
                let index = state.findIndex(u => u.id === upload.id);
                if (index === -1) {
                    state = [upload, ...state];
                } else {
                    state[index] = upload;
                }
            })
            return state;
        }
    }
});

export const { addUploads } = uploadsSlice.actions

export default uploadsSlice.reducer