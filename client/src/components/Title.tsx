import store from '../store'
import { uploadsSlice } from "../slices";
import { useAppSelector } from "../hooks";


function Title({title}: { title: string }) {
    const thumbnailSize = useAppSelector(state => state.uploads.thumbnailSize);

    const updateSize = (size: number) => {
        store.dispatch(uploadsSlice.actions.setThumbnailSize(size));
    }

    const sizes = [12, 6, 4, 3, 2];
    const sizeOptions = sizes.map(value => {
        return (<label className="btn" htmlFor={`icon-size-${value}`} key={value}>
                <input className="btn-check" type="radio" id={`icon-size-${value}`} checked={thumbnailSize == value}
                   onClick={() => updateSize(value)} onChange={() => updateSize(value)} value={value} />
                {value}
            </label>);
    });

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
                            { sizeOptions }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Title;