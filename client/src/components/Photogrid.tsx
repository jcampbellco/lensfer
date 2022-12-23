import { UploadsModals, uploadsSlice, UploadState } from "../slices/uploadsSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import UploadModal from "./UploadModal";
import DeleteUploadModal from "./DeleteUploadModal";

type PhotogridProps = { uploads: UploadState[]; }

function Photogrid({ uploads }: PhotogridProps) {
    const { selectedUpload, thumbnailSize, modal } = useAppSelector((state) => state.uploads);

    const dispatch = useAppDispatch();
    let uploadClickHandler = (event: any, upload: UploadState) => {
        event.preventDefault();
        dispatch(uploadsSlice.actions.setSelectedUpload(upload));
        dispatch(uploadsSlice.actions.setModal(UploadsModals.Details));
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
    if (selectedUpload && modal === UploadsModals.Details) {
        modals.push((<UploadModal upload={selectedUpload} key={"upload-details"} />));
    }
    if (selectedUpload && modal === UploadsModals.Delete) {
        modals.push((<DeleteUploadModal upload={selectedUpload} key={"upload-delete"} />));
    }

    const thumbnailSizeMap = [6, 4, 3, 2]; //
    const classes = `row g-3 mb-3 row-cols-${thumbnailSizeMap[thumbnailSize]}`;

    return (
        <div className="wrapper">
            <div className={classes}>
                { uploadComponents }
            </div>
            { modals }
        </div>
    )
}

export default Photogrid;