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
    filename: string;
    mimetype: string;
    size: number;
    createdAt: string;
    updatedAt: string;
    url: PresignedUrlState;
}

export interface UploadsState {
    uploads: UploadState[];
    selectedUpload?: UploadState;
}

const initialState = {
    uploads: [] as UploadState[],
} as UploadsState;

export const uploadsSlice = createSlice({
    name: 'uploads',
    initialState,
    reducers: {
        addUploads: (state: UploadsState, action: PayloadAction<UploadState|UploadState[]>) => {
            const uploads = Array.isArray(action.payload) ? action.payload : [action.payload];
            uploads.forEach((upload: UploadState) => {
                let index = state.uploads.findIndex(u => u.id === upload.id);
                if (index === -1) {
                    state.uploads = [upload, ...state.uploads];
                } else {
                    state.uploads[index] = upload;
                }
            })
            return state;
        },
        setSelectedUpload: (state: UploadsState, action: PayloadAction<UploadState>) => {
            state.selectedUpload = action.payload;
        },
        clearSelectedUpload: (state: UploadsState) => {
            delete state.selectedUpload;
        }
    }
});

export const { addUploads } = uploadsSlice.actions

export default uploadsSlice.reducer