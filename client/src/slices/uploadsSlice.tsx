import {createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface PresignedUrlState {
    url: string;
    exp: number;
    expIn: number;
    headers: string[];
}

export interface UploadStatsState {
    views: number;
}

export interface PaginateState {
    page: number;
    perPage: number;
    total: number;
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
    publicFilename: string;
    stats: UploadStatsState;
}

export interface UploadsState {
    uploads: UploadState[];
    selectedUpload?: UploadState|null;
    thumbnailSize: number;
    paginate: PaginateState;
    modal: UploadsModals|null;
}

export enum UploadsModals {
    Details,
    Delete,
}

const initialState = {
    uploads: [] as UploadState[],
    thumbnailSize: 1,
    paginate: { page: 1, perPage: 12 } as PaginateState,
    modal: null,
} as UploadsState;

export const uploadsSlice = createSlice({
    name: 'uploads',
    initialState,
    reducers: {
        setUploads: (state: UploadsState, action: PayloadAction<UploadState[]>) => {
            state.uploads = [...action.payload];
        },
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
        deleteUpload: (state: UploadsState, action: PayloadAction<UploadState>) => {
            const index = state.uploads.findIndex((upload: UploadState) => {
                return upload.id === action.payload.id;
            });
            if (index !== -1) {
                delete state.uploads[index];
            }
        },
        setSelectedUpload: (state: UploadsState, action: PayloadAction<UploadState>) => {
            state.selectedUpload = action.payload;
        },
        clearSelectedUpload: (state: UploadsState) => {
            delete state.selectedUpload;
        },
        setThumbnailSize: (state: UploadsState, action: PayloadAction<number>) => {
            state.thumbnailSize = action.payload;
        },
        setPaginatePage: (state: UploadsState, action: PayloadAction<number>) => {
            state.paginate.page = action.payload;
        },
        setPaginateTotal: (state: UploadsState, action: PayloadAction<number>) => {
            state.paginate.total = action.payload;
        },
        setPaginatePerPage: (state: UploadsState, action: PayloadAction<number>) => {
            state.paginate.perPage = action.payload;
        },
        setModal: (state: UploadsState, action: PayloadAction<UploadsModals|null>) => {
            state.modal = action.payload;
        }
    }
});

export const { addUploads } = uploadsSlice.actions

export default uploadsSlice.reducer