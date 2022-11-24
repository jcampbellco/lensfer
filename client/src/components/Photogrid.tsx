import {UploadState} from "../slices/uploadsSlice";
import {uploads as uploadsService} from "../services";

type PhotogridProps = { uploads: UploadState[]; }

function Photogrid({ uploads }: PhotogridProps) {
    let uploadComponents = uploads.map((upload, index) => {
        return (
            <div className="datagrid-item" key={index} style={{ maxWidth: '200px' }}>
                <div className="datagrid-title">{ uploadsService.prettyId(upload) }</div>
                <div className="datagrid-content">
                    <img src={ upload.url.url } className="img-thumbnail" />
                </div>
            </div>
        )
    })
    return (
        <div className="card">
            <div className="card-body">
                <div className="datagrid">
                    { uploadComponents }
                </div>
            </div>
        </div>
    )
}

export default Photogrid;