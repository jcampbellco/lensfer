import React, { useCallback, useEffect } from 'react';
import { useDropzone } from "react-dropzone";
import { auth, uploads as uploadsService } from "../services";
import store from "../store";
import { uploadsSlice } from "../slices";
import { useAppSelector } from "../hooks";
import Photogrid from "../components/Photogrid";
import UploadCard from "../components/UploadCard";
import Title from "../components/Title";

function HomePage() {
    // useEffect is firing twice on loading and causing the uploads to be doubled
    const fetchUploads = async () => {
        return await uploadsService.loadUploads()
    }

    useEffect(() => {
        (async () => {
            let { data: { items } } = await fetchUploads();
            store.dispatch(uploadsSlice.actions.addUploads(items))
        })();
    }, []);

    const uploads = useAppSelector((state) => state.uploads.uploads);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        let promises: Promise<any>[] = [];
        // @todo complex chain of nested promises, refactor?
        acceptedFiles.forEach((file: File) => {
            promises.push(auth.getUploadUrl(file).then((createResponse: any) => {
                return uploadsService.send(createResponse.data.uploadContext.url, file).then(_ => {
                    // @todo check s3 upload response to verify correct upload? Defeats purpose of "confirm" state otherwise
                    return uploadsService.confirm(createResponse.data.upload).then((confirmResponse: any) => {
                        store.dispatch(uploadsSlice.actions.addUploads(confirmResponse.data.upload));
                    });
                });
            }));
        });

        Promise.all(promises).then(_ => {
            // All promises resolve, uploads are complete
        });
    }, []);
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, noClick: true})


    const body = uploads.length > 0 ?
        <Photogrid uploads={uploads} /> : <UploadCard isDragActive={isDragActive} />

    return (
        <>
            <Title title={"Uploads"} />
            <div className="page-body" {...getRootProps()} style={{ minHeight: '70vh' }}>
                <div className="container-xl">
                    { body }
                </div>
                <input {...getInputProps()} />
            </div>
        </>
    );
}

export default HomePage;