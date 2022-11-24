import {uploadsSlice, UploadState} from "../slices/uploadsSlice";
import store from "../store";

type UploadModalProps = {
    upload: UploadState
};

function UploadModal({ upload }: UploadModalProps) {
    const closeHandler = () => {
        store.dispatch(uploadsSlice.actions.clearSelectedUpload());
    }

    return (
        <div className="modal modal-blur fade show d-block" id="modal-simple" tabIndex={-1} role="dialog" aria-modal="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{ upload.filename }</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close" onClick={() => closeHandler()}></button>
                    </div>
                    <div className="modal-body d-flex justify-content-center">
                        <img src={ upload.url.url } alt={ upload.filename } className="img img-responsive" style={{ maxHeight: '70vh', paddingTop: 'unset' }} />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn me-auto" data-bs-dismiss="modal" onClick={() => closeHandler()}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadModal;