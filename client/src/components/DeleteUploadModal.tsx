import { uploadsSlice, UploadState } from "../slices/uploadsSlice";
import { uploads } from "../services";
import Modal from "react-bootstrap/Modal";
import { useAppDispatch } from "../hooks";
import { Button } from "react-bootstrap";

type DeleteUploadModalProps = {
    upload: UploadState
};

function DeleteUploadModal({upload}: DeleteUploadModalProps) {
    const dispatch = useAppDispatch();
    const closeHandler = () => {
        dispatch(uploadsSlice.actions.setModal(null));
    }

    const deleteHandler = () => {
        uploads.delete(upload).then(_ => {
            dispatch(uploadsSlice.actions.deleteUpload(upload));
            dispatch(uploadsSlice.actions.setModal(null));
        });
    }

    return (
        <Modal show={true} onHide={closeHandler} scrollable={true} centered>
            <Modal.Header closeButton>
                <Modal.Title className="text-uppercase text-primary">Delete {uploads.prettyId(upload)}?</Modal.Title>
            </Modal.Header>
            <Modal.Body className="row row-deck row-cards">
                <div className="col-lg-3 col-xs-12">
                    <img src={upload.url.url} alt={upload.filename} className="img img-responsive m-auto img-thumbnail"
                         style={{maxHeight: '70vh', paddingTop: 'unset'}}/>
                </div>
                <div className="col-lg-9 col-xs-12 d-flex flex-column">
                    <p>Are you sure you want to delete this upload?</p>
                    <p>This cannot be undone.</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={'danger'} onClick={closeHandler}>No</Button>
                <Button onClick={deleteHandler}>Yes</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default DeleteUploadModal;