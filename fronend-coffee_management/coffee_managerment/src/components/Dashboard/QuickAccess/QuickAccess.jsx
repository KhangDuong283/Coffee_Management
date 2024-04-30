import "./QuickAccess.css";

export default function QuickAccess() {
    return (
        <div className="quick-access">
            <div className="item">
                <i className="fa fa-shopping-cart"></i>
                <h5>Number of orders</h5>
                <p>437/500 files</p>
            </div>
            <div className="item">
                <i className="fa fa-file-invoice-dollar"></i>
                <h5>Quantity products sold</h5>
                <p>210/500 files</p>
            </div>
            <div className="item">
                <i className="fa fa-money-check-alt"></i>
                <h5>Revenue</h5>
                <p>90/1000 files</p>
            </div>
            <div className="item">
                <i className="fa fa-donate"></i>
                <h5>Profit</h5>
                <p>540/800 files</p>
            </div>
        </div>
    )
}
