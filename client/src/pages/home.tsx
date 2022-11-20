import React, {useCallback} from 'react';
import {useDropzone} from "react-dropzone";
import {IconFilePlus, IconFileUpload} from "@tabler/icons";


function HomePage() {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        console.log('acceptedFiles', acceptedFiles);
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    const icon = isDragActive ? <IconFilePlus size={128} className="pb-3" /> : <IconFileUpload size={128} className="pb-3 opacity-60" />;

    return (
        <div className="page-body" {...getRootProps()}>
            <div className="container-xl">
                <div className="row row-cards">
                    <div className="col-md-8 offset-2">
                        <div className="card" style={{ minHeight: '33vh' }}>
                            <div className="card-body d-flex flex-column">
                                <div className="dz-default dz-message d-flex flex-column flex-grow-1 justify-content-center">
                                    <form className="dropzone dz-clickable" id="dropzone-multiple" action="./" autoComplete="off">
                                        { icon }
                                        <input {...getInputProps()} />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;