import './preLoader.scss';
export const PreLoader = () => {
    return (
        <div className="pre-loader">
            <div className="body">
                <span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
                <div className="hand">
                    <span></span>
                    <div className="face"></div>
                    <div className="cowl"></div>
                </div>
            </div>
        </div>
    )
}