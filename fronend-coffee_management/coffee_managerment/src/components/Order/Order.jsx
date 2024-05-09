/* eslint-disable jsx-a11y/anchor-is-valid */
import { useDispatch, useSelector } from "react-redux";
import "./Order.css";
import { addCart, emptyCart, removeFromCart } from "../Menu/CartSlice";
import { useNavigate } from "react-router-dom";
import useReadBranch from './../Branch/BranchList/hooks/useReadBranch';
import useReadEmployee from './../Employee/EmployeeList/hooks/useReadEmployee';
import { useState } from "react";
import useCreateBill from "./hooks/useCreateBill";
import { toast } from "react-toastify";
import useReadBill from './hooks/useReadBill';
import useCreateBillProduct from './hooks/useCreateBillProduct';

// Thực hiện in hóa đơn


export default function Order() {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart);

    // đếm số lượng của mỗi sản phẩm
    const cartWithQuantity = cart?.map(product => {
        const quantity = cart?.filter(p => p.product_id === product.product_id
            && p.product_current_size === product.product_current_size).length;
        return { ...product, product_quantity: quantity };
    });

    // **************************************************************************************************
    // **************************************************************************************************
    // CART CHÍNH
    // **************************************************************************************************
    // **************************************************************************************************
    // filter duyệt lần lượt qua các sản phẩm trong cart
    const updatedCart = cartWithQuantity?.filter((product, index) => {
        // chỉ giữ lại phần từ có index trùng với index hiện tại 
        const status = cartWithQuantity?.findIndex(p => p.product_id === product.product_id
            && p.product_current_size === product.product_current_size) === index;

        return status
    });

    // console.log(updatedCart);

    // Clear cart
    const handleClear = () => {
        dispatch(emptyCart());
    }

    // Phí tạm tính
    const sub_total = updatedCart?.reduce((total, product) => {
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
    const sub_profit = updatedCart?.reduce((total, product) => {
        return total +
            (product.product_current_size == 0 ? Number(product.product_price_s - product.product_cost_s) * product.product_quantity
                : product.product_current_size == 1 ? Number(product.product_price_m - product.product_cost_m) * product.product_quantity
                    : Number(product.product_price_l - product.product_cost_l) * product.product_quantity);
    }, 0);


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


    const navigate = useNavigate();
    const handleLogoutBranch = () => {

        // Xóa thông tin chi nhánh khỏi localStorage
        localStorage.removeItem('post_data');
        // Chuyển hướng về trang login bằng navigate
        navigate("/post/post_login");
    }

    // lấy dữ liệu branch_id từ localStorage đữ lưu khi login
    const branch_id = localStorage?.getItem('branch_id');

    const { branches } = useReadBranch();
    const branch_data = branches ? branches : null

    // lấy thông tin của branch cùng với branch id đươc lưu trong localStorage
    const this_branch = branch_data?.find(branch => branch.branch_id == branch_id);

    // Lấy danh sách nhân viên từ database
    const { employees } = useReadEmployee();
    const employee_data = employees ? employees : null

    // Lấy danh sách nhân viên có employee_position là Casier trong this_branch
    const casiers_employee = employee_data?.filter(employee => employee.branch_id == branch_id && employee.employee_position == "Cashier");

    // Lấy nhân viên được chọn ở option
    const [selectedEmployee, setSelectedEmployee] = useState("");
    const handleEmployeeChange = (event) => {
        setSelectedEmployee(event.target.value);
    }

    const { createBill } = useCreateBill();
    const { createBillProduct } = useCreateBillProduct();
    const { bills } = useReadBill();
    const bills_data = bills ? bills : [];

    const handleOrder = () => {
        // Vì không thể lấy được bill_id từ database ngay sau khi tạo bill (để tạo bảng chi tiết hóa đơn) 
        // nên phải tự tạo một bill_id ở FE (bug này cần fix lại)
        // Đặt bill_id ban đầu để trường hợp bills_data rỗng không thể reduce được
        let newBillId = "OD001";

        if (bills_data && bills_data.length > 0) {
            // Nếu có dữ liệu bills_data thì tìm ra bill_id lớn nhất
            const maxBillId = bills_data?.reduce((max, item) => {
                return max > item.bill_id ? max : item.bill_id;
            }, '');

            // Tách phần số từ maxBillId
            const numberPart = parseInt(maxBillId.substring(2));

            // Tăng phần số lên 1
            const newNumberPart = numberPart + 1;

            // Định dạng lại phần số để có đủ 3 chữ số (paddStart dùng để tự động thêm số 0 vào trước phần số cho đủ 3 chữ số)
            const formattedNumberPart = newNumberPart.toString().padStart(3, '0');

            // Nối lại với phần chữ để tạo newBillId mới
            newBillId = "OD" + formattedNumberPart;
        }

        // Tạo một bill mới (bây giờ đã biết trước bill_id)
        const newBill = {
            bill_id: newBillId,
            branch_id: branch_id,
            employee_id: selectedEmployee,
        }

        // Khi có sản phẩm trong cart thì mới thực hiện order
        if (sub_total !== 0) {
            // Gửi bill mới lên server
            createBill(newBill);

            // Thêm thông tin từng sản phẩm vào chi tiết hóa đơn
            // console.log("Cart", updatedCart)
            updatedCart?.map((product) => {

                // lấy size
                var size = product.product_current_size == 0 ? "S" :
                    product.product_current_size == 1 ? "M" :
                        product.product_current_size == 2 ? "L" : null;

                // lấy giá
                var price = size == "S" ? product.product_price_s :
                    size == "M" ? product.product_price_m :
                        size == "L" ? product.product_price_l : null;
                // lấy chi phí
                var cost = size == "S" ? product.product_cost_s :
                    size == "M" ? product.product_cost_m :
                        size == "L" ? product.product_cost_l : null;

                const newBillProduct = {
                    bill_id: newBillId,
                    product_id: product.product_id,
                    billproduct_size: product.product_current_size,
                    billproduct_price: price,
                    billproduct_cost: cost,
                    billproduct_quantity: product.product_quantity,
                }

                // Tạo chi tiết hóa đơn mới
                createBillProduct(newBillProduct);
                // toast.info("newBillProduct successfully!!")

            });

            // Sau đó clear cart
            dispatch(emptyCart());

            // Chuyển hướng đến trang in hóa đơn và truyền một số thông tin này kia qua state
            navigate("/post/print_bill", { state: { bill: newBill, bill_id: newBillId, branch: this_branch, cart: updatedCart, employee_id: selectedEmployee, employees: casiers_employee } })
        } else {
            toast.error("Please add some products to cart!!")
        }

    }

    return (
        // Chỉnh background màu đen
        <div className="order__content bg-white container" style={{ height: "95vh" }}>
            <div className="order__header w-100 d-flex flex-column align-items-center">
                <div className="order__header-content">
                    <select onChange={handleEmployeeChange}>
                        <option value="">Implement employee</option>
                        {casiers_employee?.map((employee) => (
                            <option key={employee.employee_id} value={employee.employee_id}>
                                {employee.employee_name}
                            </option>
                        ))}
                    </select>

                    <div className="branch__name" data-bs-toggle="dropdown" aria-expanded="false">{this_branch?.branch_name}</div>
                    <ul className="dropdown-menu">
                        <a className="dropdown-item" onClick={handleLogoutBranch}>Logout branch</a>
                    </ul>

                </div>
            </div>

            <div className="order__content-item w-100 d-flex flex-column align-items-center">
                {updatedCart?.map((product, index) => (
                    <div className="order__item m-2 text-center d-flex" key={index}>
                        <img className="product__img"
                            src={
                                product.product_img === "" ? "http://nienluan.localhost/uploads/productRoot.png" :
                                    "http://nienluan.localhost/uploads/" + product.product_img
                            }
                            alt={product.product_name} />
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
                    {/* <button className="btn btn-success mt-5" onClick={handleOrder}>Place order</button> */}
                    <button className="btn btn-info mt-5" onClick={handleOrder}>Order</button>

                </div>
            </div>

        </div>
    )
}