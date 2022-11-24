import {useState} from "react";

function Title({title}: { title: string }) {
    const [size, setSize] = useState(4);

    const updateSize = (size: number) => {
        setSize(size);
    }

    const sizes = [7, 14, 21, 28];
    const sizeOptions = sizes.map(value => {
        return (<label className="btn" htmlFor={`icon-size-${value}`} key={value}>
                <input className="btn-check" type="radio" id={`icon-size-${value}`} checked={size == value}
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