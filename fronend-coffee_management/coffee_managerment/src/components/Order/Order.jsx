import { useDispatch, useSelector } from "react-redux";
import "./Order.css";
import { addCart, emptyCart, removeFromCart } from "../Menu/CartSlice";

export default function Order() {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);

    // đếm số lượng của mỗi sản phẩm
    const cartWithQuantity = cart.map(product => {
        const quantity = cart.filter(p => p.product_id === product.product_id
            && p.product_current_size === product.product_current_size).length;
        return { ...product, product_quantity: quantity };
    });

    // filter duyệt lần lượt qua các sản phẩm trong cart
    const updatedCart = cartWithQuantity.filter((product, index) => {
        // chỉ giữ lại phần từ có index trùng với index hiện tại 
        const status = cartWithQuantity.findIndex(p => p.product_id === product.product_id
            && p.product_current_size === product.product_current_size) === index;

        return status
    });

    // console.log(updatedCart);

    // Clear cart
    const handleClear = () => {
        dispatch(emptyCart());
    }

    // Phí tạm tính
    const sub_total = updatedCart.reduce((total, product) => {
        return total +
            (product.product_current_size == 0 ? Number(product.product_price_s) * product.product_quantity
                : product.product_current_size == 1 ? Number(product.product_price_m) * product.product_quantity
                    : Number(product.product_price_l) * product.product_quantity);
    }, 0);

    // Thuế VAT
    const vat = sub_total * 10 / 100;

    // tổng tiền
    const total = sub_total + vat;

    // Lãi tạm tính
    const sub_profit = updatedCart.reduce((total, product) => {
        return total +
            (product.product_current_size == 0 ? Number(product.product_price_s - product.product_cost_s) * product.product_quantity
                : product.product_current_size == 1 ? Number(product.product_price_m - product.product_cost_m) * product.product_quantity
                    : Number(product.product_price_l - product.product_cost_l) * product.product_quantity);
    }, 0);

    // Lợi nhuận
    const profit = sub_profit - vat;                                                                


    const handleOrder = () => {

        // Sau đó clear cart
        // dispatch(emptyCart());

    }

    const handleMinus = (product) => {
        // Xóa sản phẩm khỏi cart
        dispatch(removeFromCart(product));
    }

    const handlePlus = (product) => {
        // Tạo một bản sao của product
        const productToAdd = { ...product };
        // Gửi sản phẩm mới được thêm vào lên store
        dispatch(addCart(productToAdd));
    }

    const handleRemove = (product) => {
        const quantity = product.product_quantity;
        for (let i = 0; i < quantity; i++) {
            dispatch(removeFromCart(product));
        }
    }


    return (
        // Chỉnh background màu đen
        <div className="order__content bg-white container" style={{ height: "95vh" }}>
            <div className="order__content-item w-100 d-flex flex-column align-items-center">
                {updatedCart?.map((product, index) => (
                    <div className="order__item m-2 text-center d-flex" key={index}>
                        <img className="product__img" src="https://cdn.tgdd.vn/Files/2020/04/08/1247674/ca-phe-espresso-cappuccino-hay-macchiato-khac-nhau-nhu-the-nao-202004081936305660.jpg" alt={product.product_name} />
                        <span>
                            <div className="product__name">

                                {product.product_current_size == 0 ? "(S) " : null}
                                {product.product_current_size == 1 ? "(M) " : null}
                                {product.product_current_size == 2 ? "(L) " : null}
                                {product.product_name}
                            </div>
                            <div className="product__price">
                                {product.product_current_size == 0 ? Number(product.product_price_s).toLocaleString() : null}
                                {product.product_current_size == 1 ? Number(product.product_price_m).toLocaleString() : null}
                                {product.product_current_size == 2 ? Number(product.product_price_l).toLocaleString() : null}
                                đ
                            </div>
                        </span>
                        <div className="btn__group">
                            <i className="fa fa-minus-circle" onClick={() => { handleMinus(product) }}></i>
                            <span className="quantity mx-2 fs-5">{product.product_quantity}</span>
                            <i className="fa fa-plus-circle" onClick={() => { handlePlus(product) }}></i>
                        </div>
                        <div className="btn__remove" onClick={() => { handleRemove(product) }}>
                            <i className="fa fa-times fs-5"></i>
                        </div>
                    </div>
                ))}

            </div>

            <div className="payment__content d-flex flex-column align-items-center bg-white">
                <div className="total__pay">
                    <div className="sub__total">Sub Total</div>
                    <div className="sub__total-value">{sub_total.toLocaleString()}</div>
                </div>

                <div className="tax__pay">
                    <div className="tax">Tax 10%</div>
                    <div className="vat__value">{vat.toLocaleString()}</div>
                </div>
                <hr />
                <div className="pay">
                    <div className="total">Total</div>
                    <div className="total__value">{(total).toLocaleString()}</div>
                </div>

                <div className="order__button">
                    <button className="btn btn-danger mt-5" onClick={handleClear}>Clear</button>
                    <button className="btn btn-success mt-5" onClick={handleOrder}>Place order</button>
                </div>
            </div>

        </div>
    )
}