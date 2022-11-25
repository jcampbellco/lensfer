import {uploadsSlice, UploadState} from "../slices/uploadsSlice";
import store from "../store";
import {uploads} from "../services";

type UploadModalProps = {
    upload: UploadState
};

function UploadModal({ upload }: UploadModalProps) {
    const closeHandler = () => {
        store.dispatch(uploadsSlice.actions.clearSelectedUpload());
    }

    return (
        <div className="modal modal-blur fade show d-block" id="modal-simple" tabIndex={-1} role="dialog" aria-modal="true">
            <div className="modal-dialog modal-dialog-centered" role="document" style={{ width: '85%', maxWidth: '1800px' }}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h6 className="modal-title text-uppercase text-primary">{ uploads.prettyId(upload) }</h6>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close" onClick={() => closeHandler()}></button>
                    </div>
                    <div className="modal-body row row-deck row-cards">
                        <div className="col-lg-9 col-sm-6 col-xs-12">
                            <img src={ upload.url.url } alt={ upload.filename } className="img img-responsive m-auto" style={{ maxHeight: '70vh', paddingTop: 'unset' }} />
                        </div>
                        <div className="col-lg-3 col-sm-6 col-xs-12 d-flex flex-column">
                            <div className="accordion">
                                <div className="accordion-item">
                                    <h2 className="accordion-header text-primary">
                                        <button className="accordion-button">Details</button>
                                    </h2>
                                    <div className={`accordion-collapse`}>
                                        <div className="accordion-body">
                                            <h4>Original Filename</h4>
                                            <code className="mb-3 d-block">{ upload.filename }</code>
                                            <h4>Mimetype</h4>
                                            <code className="mb-3 d-block">{ upload.mimetype }</code>
                                            <h4>Uploaded</h4>
                                            <code className="mb-3 d-block">{ upload.createdAt }</code>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header text-primary">
                                        <button className="accordion-button">Tags</button>
                                    </h2>
                                    <div className={`accordion-collapse`}>
                                        <div className="accordion-body">
                                            <h4>Tags?</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadModal;