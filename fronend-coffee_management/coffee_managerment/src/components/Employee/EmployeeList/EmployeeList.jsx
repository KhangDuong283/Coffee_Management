import "./EmployeeList.css"
import { useState, useEffect } from 'react';
import moment from "moment";
import { useNavigate } from "react-router-dom";
import useReadEmployee from "./hooks/useReadEmployee";
import useReadBranch from "../../Branch/BranchList/hooks/useReadBranch";
import useDeleteEmployee from "./hooks/useDeleteEmployee";

export default function EmployeeList() {
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
    // Lấy dữ liệu employee từ database
    const { employees, error } = useReadEmployee();
    const employee_data = employees;

    // Lấy tên branch từ branch_id
    const { branches } = useReadBranch();
    const branch_data = branches;

    const getBranchName = (branch_id) => {
        if (branch_data) {
            const branch = branch_data.find(b => b.branch_id === branch_id);
            if (branch) {
                return branch.branch_name;
            }
        }
        return "";
    }

    const navigate = useNavigate();

    // Chuyển hướng đến trang sửa employee và truyền employee cần sửa
    const handleEdit = (employee) => {
        navigate('/management/employee/edit', { state: { employee } });
    }

    // Chuyển hướng đến trang thêm employee
    const handleAdd = () => {
        navigate('/management/employee/add');
    }

    // Xóa employee
    const { deleteEmployee } = useDeleteEmployee();
    const handleDelete = (employee_id) => {
        deleteEmployee(employee_id)
    }

    return (
        <table className="employee__list">
            <thead>
                <tr>
                    <th>Employee id</th>
                    <th>Employee name</th>
                    <th>Employee position</th>
                    <th>Branch name</th>
                    <th>
                        <button className="btn btn-info" onClick={handleAdd}>
                            Add employee
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody>

                {!error && !employee_data ?
                    (<tr><td colSpan="5">There are no employees right now</td></tr>)
                    :
                    (employee_data?.map((employee, index) => (
                        <tr key={index}
                            // Hiển thị row được chọn
                            onClick={() => handleClick(index)}
                            className={index === selectedRow ? 'selected' : ''}
                            // Nếu clickCount = 1 thì mở modal
                            data-bs-toggle={clickCount === 1 ? "modal" : null} data-bs-target={"#employeeListModal" + employee.employee_id}
                        >
                            <td className="name" >{employee.employee_id}</td>
                            <td className="name">{employee.employee_name}</td>
                            <td className="more">{employee.employee_position}</td>
                            <td className="more">{getBranchName(employee.branch_id)}</td>
                            <td className="more dropstart" >
                                <p data-bs-toggle="dropdown" aria-expanded="false" className="mb-0">
                                    <i className="ri-more-fill" />
                                </p>
                                <ul className="dropdown-menu text-center">
                                    <li><button className="w-100 btn edit" onClick={() => { handleEdit(employee) }}>Edit</button></li>
                                    <li><button className="w-100 btn delete" onClick={() => { handleDelete(employee.employee_id) }}>Delete</button></li>
                                </ul>
                            </td>

                            {/* Modal */}
                            <div className="modal fade branch__modal" id={"employeeListModal" + employee.employee_id} tabIndex={- 1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                    <div className="modal-content">
                                        <form>
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-4 ms-3" id="exampleModalLabel">{employee.employee_id}</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                            </div>
                                            <div className="modal-body">
                                                <div className="table table-hover">
                                                    <tbody>
                                                        <tr>
                                                            <th>Name</th>
                                                            <td>{employee.employee_name}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Age</th>
                                                            <td>{employee.employee_age}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Email</th>
                                                            <td>{employee.employee_email}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Phone</th>
                                                            <td>{employee.employee_phone}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Branch</th>
                                                            <td>{getBranchName(employee.branch_id)}</td>
                                                        </tr>
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