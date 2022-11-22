import { api } from './api'
import {UploadState} from "../slices/uploadsSlice";

class Uploads {
    loadUploads() {
        return api.get('/uploads');
    }

    prettyId(upload: UploadState) {
        return upload.id.split('-')[0];
    }
}

export const uploads = new Uploads();
