import {uploadsSlice, UploadState} from "../slices/uploadsSlice";
import store from "../store";
import {uploads} from "../services";
import Accordion from "react-bootstrap/Accordion";
import Modal from "react-bootstrap/Modal";
import {useAppSelector} from "../hooks";
import {IconCopy, IconCheck} from "@tabler/icons";
import {useRef, useState} from "react";
import {Button, Overlay, Tooltip} from "react-bootstrap";

type UploadModalProps = {
    upload: UploadState
};

function UploadModal({upload}: UploadModalProps) {
    const [icon, setIcon] = useState('copy');

    const selectedUpload = useAppSelector((state) => state.uploads.selectedUpload);

    const closeHandler = () => {
        store.dispatch(uploadsSlice.actions.clearSelectedUpload());
    }

    const imgUrl = `http://localhost:3000/${uploads.prettyId(upload)}.jpg`;

    const copyHandler = () => {
        console.log('copyHandler', imgUrl);
        window.navigator.clipboard.writeText(imgUrl);
        setIcon('check');
        setTimeout(() => setIcon('copy'), 2500);
    }

    const target = useRef(null);

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
                            <Accordion.Header className="text-primary">Share</Accordion.Header>
                            <Accordion.Body>
                                <div className="input-group mb-2">
                                    <input type="text" className="form-control" value={imgUrl} readOnly={true} />
                                    <Button ref={target} onClick={copyHandler} data-bs->
                                        {
                                            icon === 'copy' ?
                                                <IconCopy className="mr-0" /> :
                                                <IconCheck className="mr-0" />
                                        }
                                    </Button>
                                    <Overlay target={target.current} show={icon === 'check'} placement="bottom">
                                        {(props) => (
                                            <Tooltip {...props}>
                                                Copied!
                                            </Tooltip>
                                        )}
                                    </Overlay>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
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
                    </Accordion>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default UploadModal;