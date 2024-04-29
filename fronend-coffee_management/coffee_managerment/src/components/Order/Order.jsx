import "./Order.css";

export default function Order() {

    

    const price = 56000;
    return (
        // Chỉnh background màu đen
        <div className="order__content bg-white container" style={{ height: "95vh" }}>
            <div className="order__content-item w-100 d-flex flex-column align-items-center">
                <div className="order__item m-2 text-center d-flex">
                    <img className="product__img" src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/ba/29/5c/img-worlds-of-adventure.jpg?w=1200&h=1200&s=1" alt="hi" />
                    <span>
                        <div className="product__name">
                            Phin đen đá bạc xỉu
                        </div>
                        <div className="product__price">
                            {price.toLocaleString()}
                            đ
                        </div>
                    </span>
                    <div className="btn__group">
                        <i className="fa fa-minus-circle"></i>
                        <span className="quantity mx-1">1</span>
                        <i className="fa fa-plus-circle"></i>
                    </div>
                    <div className="btn__remove">
                        <i className="fa fa-times fs-5"></i>
                    </div>
                </div>

            </div>

            <div className="payment__content d-flex flex-column align-items-center bg-white">
                <div className="total__pay">
                    <div className="sub__total">Sub Total</div>
                    <div className="sub__total-value">50000</div>
                </div>

                <div className="tax__pay">
                    <div className="tax">Tax 5%</div>
                    <div className="vat__value">5000</div>
                </div>
                <hr />
                <div className="pay">
                    <div className="total">Total</div>
                    <div className="total__value">5000</div>
                </div>

                <div className="order__button">
                    <button className="btn btn-danger mt-5">Clear</button>
                    <button className="btn btn-success mt-5">Place order</button>
                </div>
            </div>

        </div>
    )
}