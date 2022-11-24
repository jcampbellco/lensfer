import {uploadsSlice, UploadState} from "../slices/uploadsSlice";
import UploadModal from "./UploadModal";
import {useAppSelector} from "../hooks";
import store from "../store";

type PhotogridProps = { uploads: UploadState[]; }

function Photogrid({ uploads }: PhotogridProps) {
    const selectedUpload = useAppSelector((state) => state.uploads.selectedUpload);

    let uploadClickHandler = (event: any, upload: UploadState) => {
        event.preventDefault();
        store.dispatch(uploadsSlice.actions.setSelectedUpload(upload));
    }

    let uploadComponents = uploads.map((upload) => {
        return (
            <div className="col" key={ upload.id }>
                <a href={ upload.url.url } onClick={(event) => uploadClickHandler(event, upload)}>
                    <div className="img-responsive img-responsive-1x1 rounded border"
                         style={{ backgroundImage: `url(${upload.url.url})`}}></div>
                </a>
            </div>
        );
    });

    const modals = [];
    if (selectedUpload) {
        modals.push((<UploadModal upload={selectedUpload} key={"upload-details"} />));
    }

    return (
        <div className="wrapper">
            <div className="row row-cols-6 g-3">
                { uploadComponents }
            </div>
            { modals }
        </div>
    )
}

export default Photogrid;