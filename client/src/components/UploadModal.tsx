import {uploadsSlice, UploadState} from "../slices/uploadsSlice";
import store from "../store";
import {uploads} from "../services";
import Accordion from "react-bootstrap/Accordion";
import Modal from "react-bootstrap/Modal";
import {useAppSelector} from "../hooks";

type UploadModalProps = {
    upload: UploadState
};

function UploadModal({upload}: UploadModalProps) {
    const selectedUpload = useAppSelector((state) => state.uploads.selectedUpload);

    const closeHandler = () => {
        store.dispatch(uploadsSlice.actions.clearSelectedUpload());
    }

    return (
        <Modal show={selectedUpload !== undefined} onHide={closeHandler} backdrop="static" size="xl" centered>
            <Modal.Header closeButton>
                <Modal.Title className="text-uppercase text-primary">{uploads.prettyId(upload)}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="row row-deck row-cards">
                <div className="col-lg-8 col-sm-6 col-xs-12">
                    <img src={upload.url.url} alt={upload.filename} className="img img-responsive m-auto"
                         style={{maxHeight: '70vh', paddingTop: 'unset'}}/>
                </div>
                <div className="col-lg-4 col-sm-6 col-xs-12 d-flex flex-column">
                    <Accordion defaultActiveKey="0">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header className="text-primary">Details</Accordion.Header>
                            <Accordion.Body>
                                <h4>Original Filename</h4>
                                <code className="mb-3 d-block">{upload.filename}</code>
                                <h4>Mimetype</h4>
                                <code className="mb-3 d-block">{upload.mimetype}</code>
                                <h4>Uploaded</h4>
                                <code className="mb-3 d-block">{upload.createdAt}</code>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header className="text-primary">Tags</Accordion.Header>
                            <Accordion.Body>
                                <h4>Tags</h4>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default UploadModal;