import React, {useCallback, useEffect} from 'react';
import {useDropzone} from "react-dropzone";
import {IconFilePlus, IconFileUpload} from "@tabler/icons";
import {uploads as uploadsService} from "../services";
import store from "../store";
import {uploadsSlice} from "../slices";
import {useAppSelector} from "../hooks";
import Photogrid from "../components/Photogrid";
import UploadCard from "../components/UploadCard";

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

    const uploads = useAppSelector((state) => state.uploads);
    console.log("uploads", uploads);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        console.log('acceptedFiles', acceptedFiles);
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})


    const body = uploads.length > 0 ?
        <Photogrid uploads={uploads} /> : <UploadCard isDragActive={isDragActive} />

    return (
        <div className="page-body" {...getRootProps()}>
            <div className="container-xl">
                { body }
            </div>
            <input {...getInputProps()} />
        </div>
    );
}

export default HomePage;