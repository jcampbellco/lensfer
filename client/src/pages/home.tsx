import React, {useCallback} from 'react';
import {useDropzone} from "react-dropzone";
import {IconFilePlus, IconFileUpload} from "@tabler/icons";

function HomePage() {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        console.log('acceptedFiles', acceptedFiles);
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    const icon = isDragActive ? <IconFilePlus size={128} className={"d-block m-auto"} /> : <IconFileUpload size={128} className={"d-block m-auto"} />;

    return (
        <div className="page-body" {...getRootProps()}>
            <div className="container-xl">
                <div className="row row-cards">
                    <div className="col-md-8 offset-2">
                        <div className="card">
                            <div className="card-body">
                                <form className="dropzone dz-clickable" id="dropzone-multiple" action="./" autoComplete="off">
                                    <div className="m-auto py-5">
                                        { icon }
                                    </div>
                                    <input {...getInputProps()} />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;