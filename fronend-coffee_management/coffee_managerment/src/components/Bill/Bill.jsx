import React, { useRef } from 'react';
import { ReactToPrint } from 'react-to-print';
import "./Bill.css"
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';


export default function Bill() {
    const componentRef = useRef();

    const navigate = useNavigate();
    const handleReturn = () => {
        navigate("/post/order");
    }

    // Lấy dữ liệu id hóa đơn truyền từ trang Order
    const location = useLocation();
    // Thông tin hóa đơn hiện tại
    const bill = location?.state.bill;
    // Thông tin bill_id
    const bill_id = location?.state.bill_id;
    // Thông tin chi nhánh hiện tại
    const branch = location?.state.branch;
    // Thông tin các sản phẩm trong hóa đơn
    const cart = location?.state.cart;
    // id nhân viên thực hiện in hóa đơn
    const employee_id = location?.state.employee_id;
    // Thông tin các nhân viên thu ngân của chi nhánh
    const employees = location?.state.employees;
    // Tìm thông tin của nhân viên thực hiện in hóa đơn
    const employee = employees?.find(employee => employee.employee_id === employee_id);

    // ngày lập hóa đơn 
    const day = moment(bill?.order_datetime).format('DD/MM/YYYY');
    // giờ lập hóa đơn
    const time = moment(bill?.order_datetime).format('HH:mm:ss');

    // tổng tiền của cart
    const total_cart = cart?.reduce((acc, item) => {
        const { product_current_size, product_quantity, product_price_s, product_price_m, product_price_l } = item;
        const price = product_current_size === 0 ? (product_price_s) :
            product_current_size === 1 ? (product_price_m) : (product_price_l);
        const itemTotal = product_quantity * (price);
        return acc + itemTotal;
    }, 0);


    return (
        <div>
            <button onClick={handleReturn} className='return__button btn btn-info m-2'>Return</button>
            <ReactToPrint
                trigger={() => <button className='print__button btn btn-success m-2'> Print this bill</button>}
                content={() => componentRef.current}
                documentTitle={bill_id + ".pdf"}
                pageStyle="@page { size: A4; margin: 0mm; } @media print { body { -webkit-print-color-adjust: exact; } }"
            />
            <div ref={componentRef}>
                <div className="bill__content">
                    <div className="bill__title">
                        <h1 className='text-center'>{branch.branch_name}</h1>
                        <h6 className='text-center title__address'>{branch.branch_address}</h6>
                        <h6 className='text-center title__phone'>{branch.branch_phone}</h6>
                    </div>
                    <div className="bill__info my-4 container">
                        <div className="row justify-content-between">
                            <div className="col-6" style={{ textAlign: "left" }}>
                                <p className='mb-0'>Employee: {employee?.employee_name}</p>
                                <p>Phone: {employee?.employee_phone}</p>

                            </div>
                            <div className="col-6" style={{ textAlign: "right" }}>
                                <p>Order: {bill_id}</p>
                                <p>Date: {day}</p>
                                <p>Time: {time}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bill__table container-fluid">
                        <table className="table table-striped">
                            <thead style={{borderBottom: "2px solid #000"}}>
                                <tr>
                                    <th className="col">Product</th>
                                    <th className="col">Quantity</th>
                                    <th className="col">Price</th>
                                    <th className="col">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart?.map((item, index) => {
                                    const { product_name, product_current_size, product_quantity, product_price_s, product_price_m, product_price_l } = item;
                                    const size = product_current_size === 0 ? "(S)" : product_current_size === 1 ? "(M)" : "(L)";
                                    const price = product_current_size === 0 ? (product_price_s) :
                                        product_current_size === 1 ? (product_price_m) : (product_price_l);
                                    const total = product_quantity * (price);

                                    return (
                                        <tr key={index}>
                                            <td>{product_name} {size}</td>
                                            <td>{product_quantity}</td>
                                            <td>{Number(price).toLocaleString()}</td>
                                            <td>{Number(total).toLocaleString()}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                            <tfoot style={{borderTop: "2px solid #000"}} >
                                <tr>
                                    <th colSpan="3" className="text-right">Total:</th>
                                    <td>{Number(total_cart).toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <th colSpan="2" className="text-right">Tax: </th>
                                    <td>10%</td>
                                    <td>{Number(total_cart * 10 / 100).toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <th colSpan="3" className="text-right">Final:</th>
                                    <td>{Number(total_cart + total_cart * 10 / 100).toLocaleString()}</td>
                                </tr>
                            </tfoot>
                        </table>

                    </div>
                </div>
            </div>
        </div >
    );
}