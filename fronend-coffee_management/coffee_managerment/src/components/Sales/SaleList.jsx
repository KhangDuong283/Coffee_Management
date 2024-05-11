import "./SaleList.css"
import { useState, useEffect } from 'react';
import useReadBillProduct from "./hook/useReadBillProduct";
import useReadBill from "../Order/hooks/useReadBill";
import useReadBranch from "../Branch/BranchList/hooks/useReadBranch";
import moment from 'moment';
import useReadProduct from "../Product/ProductList/hooks/useReadProduct";
import useReadEmployee from "../Employee/EmployeeList/hooks/useReadEmployee";

export default function SaleList() {
    // *******************************Chọn dòng*********************************************
    // Khai báo state clickCount để lưu trữ số lần click vào row
    const [clickCount, setClickCount] = useState(0);
    // Khai báo state selectedRow để lưu trữ index của row được chọn
    const [selectedRow, setSelectedRow] = useState(null);
    // Tạo hiệu ứng select row khi click vào row
    const handleClick = (rowIndex) => {
        // Set selectedRow = rowIndex của row được click
        setSelectedRow(rowIndex);
        // Tăng clickCount lên 1 mỗi lần click vào row
        setClickCount((click) => click + 1);
    };

    useEffect(() => {
        // sau mỗi lần click giữa các thẻ <tr> mà chưa đủ 250ms thì cho clickCount = 0 để không mở modal
        // Chỉ khi click nhanh hơn 250ms thì mở modal
        const timer = setTimeout(() => {
            setClickCount(0);
        }, 250);

        // Nếu clickCount = 2 thì set lại clickCount = 0 
        if (clickCount === 2) {
            setClickCount(0);
        }

        // trả timer = 0
        return () => clearTimeout(timer);
    }, [clickCount]);

    // *************************************************************************************
    // lấy dữ liệu chi tiết hóa đơn
    const { billProducts } = useReadBillProduct();
    const billProduct_data = billProducts ? billProducts : null;

    // Tính tổng tiền của hóa đơn
    const totalBill = (bill_id) => {
        const total = billProduct_data?.filter(billProduct => billProduct.bill_id === bill_id)
            .reduce((total, billProduct) => total + billProduct.billproduct_price * billProduct.billproduct_quantity, 0);
        return Number(total).toLocaleString() + " VNĐ";
    }


    // Tính tổng số sản phẩm của hóa đơn
    const totalProduct = (bill_id) => {
        const total_product = billProduct_data?.filter(billProduct => billProduct.bill_id === bill_id)
        const total = total_product ? total_product : [];
        return total.length;
    }

    // Lấy thông tin sản phẩm
    const { products } = useReadProduct();
    const product_data = products ? products : null;
    // console.log(product_data)

    // Lấy tên sản phẩm
    const getProductName = (product_id) => {
        const product = product_data?.find(product => product.product_id === product_id);
        if (product) {
            return product.product_name;
        }

        return "";
    }

    // Tạo mảng các đối tượng sản phẩm từ id hóa đơn
    const product_list = (bill_id) => {
        const product_list = billProduct_data?.filter(billProduct => billProduct.bill_id === bill_id);
        const data = product_list ? product_list : [];
        return data;
    }

    // Lấy size sản phẩm
    const getSizeProduct = (index) => {
        return index === 0 ? "S" : index === 1 ? "M" : "L";
    }

    // Lấy dữ liệu hóa đơn
    const { bills } = useReadBill();
    const bill_data = bills ? bills : null;
    // console.log("hóa đơn ", bill_data);

    // Lấy tên branch từ branch_id
    const { branches } = useReadBranch();
    const branch_data = branches ? branches : [];

    const getBranchName = (branch_id) => {
        if (branch_data) {
            const branch = branch_data?.find(b => b.branch_id === branch_id);
            if (branch) {
                return branch.branch_name;
            }
        }
        return "";
    }
    const { employees } = useReadEmployee();
    const employee_data = employees ? employees : null;

    // trả về tên nhân viên có id tương ứng
    const getEmployeeName = (employee_id) => {
        const employee = employee_data?.find(e => e.employee_id === employee_id);
        if (employee) {
            return employee.employee_name;
        }
    }


    return (
        <table className="employee__list">
            <thead>
                <tr>
                    <th>Bill id</th>
                    <th>Branch name</th>
                    <th>Total bill</th>
                    <th>Total product</th>
                    <th>Invoicing time</th>
                </tr>
            </thead>
            <tbody>

                {!bill_data ?
                    (<tr><td colSpan="5">There are no order right now</td></tr>)
                    :
                    (bill_data?.map((bill, index) => (
                        <tr key={index}
                            // Hiển thị row được chọn
                            onClick={() => handleClick(index)}
                            className={index === selectedRow ? 'selected' : ''}
                            // Nếu clickCount = 1 thì mở modal
                            data-bs-toggle={clickCount === 1 ? "modal" : null} data-bs-target={"#employeeListModal" + bill.bill_id}
                        >
                            <td className="name" >{bill.bill_id}</td>
                            <td className="name">{getBranchName(bill.branch_id)}</td>
                            <td className="more">{totalBill(bill.bill_id)}</td>
                            <td className="more">{totalProduct(bill.bill_id)}</td>
                            <td className="more">{moment(bill.bill_datetime).format('DD/MM/YYYY')}</td>

                            {/* Modal */}
                            <div className="modal fade sales__modal" id={"employeeListModal" + bill.bill_id} tabIndex={- 1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                    <div className="modal-content">
                                        <form>
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-4 ms-3" id="exampleModalLabel">{bill.bill_id}</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                            </div>
                                            <div className="modal-body">
                                                <div className="table table-hover">
                                                    <tbody>
                                                        <tr>
                                                            <th>Invoicing time</th>
                                                            <td>
                                                                {moment(bill.bill_datetime).format('DD/MM/YYYY')}
                                                                <br />
                                                                {moment(bill.bill_datetime).format('HH:mm:ss')}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th>Total product</th>
                                                            <td>{totalProduct(bill.bill_id)}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Total bill</th>
                                                            <td>{totalBill(bill.bill_id)}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Invoicing staff</th>
                                                            <td>{getEmployeeName(bill.employee_id)}</td>
                                                        </tr>
                                                        <tr>
                                                            <th></th>
                                                            <td className="fw-bold">- - - - - Product List - - - - -</td>
                                                        </tr>
                                                        {product_list(bill.bill_id)?.map((product, index) => (
                                                            <tr key={index}>
                                                                <th>{getProductName(product.product_id)}</th>
                                                                <td>
                                                                    Amount: {product.billproduct_quantity} &nbsp;
                                                                    Size: {getSizeProduct(product.billproduct_size)}
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </tr>
                    )))
                }
            </tbody >


        </table >
    );
}