import store from '../store'
import Form from 'react-bootstrap/Form'
import { uploadsSlice } from "../slices";
import { useAppSelector } from "../hooks";


function Title({title}: { title: string }) {
    const thumbnailSize = useAppSelector(state => state.uploads.thumbnailSize);

    const updateSize = (size: number) => {
        store.dispatch(uploadsSlice.actions.setThumbnailSize(size));
    }

    return (
        <div className="page-header d-print-none">
            <div className="container-xl">
                <div className="d-flex justify-content-between">
                    <div className="col">
                        <h2 className="page-title">
                            {title}
                        </h2>
                    </div>
                    <div className="col" style={{maxWidth: '25%'}}>
                        <div className="btn-group w-100" role="group">
                            <Form.Range step={1} min={0} max={3} value={thumbnailSize} onChange={(e) => updateSize(parseInt(e.target.value))} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Title;