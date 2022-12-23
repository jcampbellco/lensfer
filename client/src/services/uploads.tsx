import { api } from './api'
import { UploadState } from "../slices/uploadsSlice";

class Uploads {
    loadUploads(page: number, perPage: number) {
        return api.get(`/uploads?page=${page}&perPage=${perPage}`);
    }

    prettyId(upload: UploadState) {
        return upload.id.split('-')[0];
    }

    // Sends a file to the provided URL, an s3 prepared request
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

    delete(upload: UploadState) {
        const url = `/uploads/${upload.id}`;
        return api.delete(url);
    }
}

export const uploads = new Uploads();
