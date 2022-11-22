import React from "react";
import {IconFilePlus, IconFileUpload} from "@tabler/icons";

type UploadCardProps = { isDragActive: boolean; };

function UploadCard({ isDragActive }: UploadCardProps) {
    const icon = isDragActive ?
        <IconFilePlus size={128} className={"d-block m-auto"} /> :
        <IconFileUpload size={128} className={"d-block m-auto"} />;

    return (
        <div className="row row-cards">
            <div className="col-md-8 offset-2">
                <div className="card">
                    <div className="card-body">
                        <div className="m-auto py-5">
                            {icon}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UploadCard;