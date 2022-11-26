function Title({ children, title }: { children: any, title: string }) {
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
                        { children }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Title;