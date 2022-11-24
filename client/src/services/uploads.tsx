import { api } from './api'
import { UploadState } from "../slices/uploadsSlice";

class Uploads {
    loadUploads() {
        return api.get('/uploads');
    }

    prettyId(upload: UploadState) {
        return upload.id.split('-')[0];
    }

    send(url: string, file: File): Promise<Response> {
        return fetch(url, {
            method: 'put',
            body: file,
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        })
    }

    confirm(upload: UploadState) {
        const url = `/uploads/${upload.id}/confirm`;
        return api.put(url, { status: 'confirmed' });
    }
}

export const uploads = new Uploads();
