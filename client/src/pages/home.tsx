import React, { useCallback, useEffect } from 'react';
import { useDropzone } from "react-dropzone";
import { auth, uploads as uploadsService } from "../services";
import store from "../store";
import { uploadsSlice } from "../slices";
import { useAppSelector } from "../hooks";
import Photogrid from "../components/Photogrid";
import UploadCard from "../components/UploadCard";
import Title from "../components/Title";
import Pagination from "../components/Pagination";
import Form from "react-bootstrap/Form";

function HomePage() {

    const thumbnailSize = useAppSelector(state => state.uploads.thumbnailSize);

    const updateSize = (size: number) => {
        store.dispatch(uploadsSlice.actions.setThumbnailSize(size));
    }

    const updatePerPage = (perPage: number) => {
        store.dispatch(uploadsSlice.actions.setPaginatePerPage(perPage));
        loadCurrentPage(page, perPage);
    }

    const { page, perPage, total } = useAppSelector((state) => state.uploads.paginate);

    // useEffect is firing twice on loading and causing the uploads to be doubled
    const fetchUploads = async (page: number, perPage: number) => {
        return await uploadsService.loadUploads(page, perPage);
    }

    const loadCurrentPage = async (page: number, perPage: number) => {
        let { data: { items, meta } } = await fetchUploads(page, perPage);
        store.dispatch(uploadsSlice.actions.setUploads(items));
        store.dispatch(uploadsSlice.actions.setPaginatePage(meta.currentPage));
        store.dispatch(uploadsSlice.actions.setPaginateTotal(meta.totalEntries));
    }

    useEffect(() => {
        loadCurrentPage(page, perPage);
    }, []);

    let changePageHandler = (newPage: number, oldPage: number) => {
        store.dispatch(uploadsSlice.actions.setPaginatePage(newPage));
        loadCurrentPage(newPage, perPage);
    }

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
            loadCurrentPage(page, perPage);
        });
    }, []);
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, noClick: true})

    const body = uploads.length > 0 ?
        <Photogrid uploads={uploads} /> : <UploadCard isDragActive={isDragActive} />

    return (
        <>
            <Title title={"Uploads"}>
                <div className="btn-group w-100 d-flex align-items-center" role="group">
                    <Form.Range step={1} min={0} max={3} value={thumbnailSize} onChange={(e) => updateSize(parseInt(e.target.value))} />
                    <Form.Select className="m form-control-rounded" style={{ marginLeft: '3rem', maxWidth: '4rem' }} onChange={(e) => updatePerPage(parseInt(e.target.value))} value={perPage}>
                        <option value={6}>6</option>
                        <option value={12}>12</option>
                        <option value={24}>24</option>
                        <option value={36}>36</option>
                        <option value={48}>48</option>
                    </Form.Select>
                </div>
            </Title>
            <div className="page-body" {...getRootProps()} style={{ minHeight: '70vh' }}>
                <div className="container-xl">
                    { body }
                </div>
                <input {...getInputProps()} />
                <Pagination currentPage={page} totalItems={total} perPage={perPage} onChange={changePageHandler} numOfItems={6} />
            </div>
        </>
    );
}

export default HomePage;