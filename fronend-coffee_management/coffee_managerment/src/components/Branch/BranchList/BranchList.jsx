import "./BranchList.css"
import { useState, useEffect } from 'react';
import useReadBranch from "./hooks/useReadBranch";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import useDeleteBranch from "./hooks/useDeleteBranch";
import useReadEmployee from './../../Employee/EmployeeList/hooks/useReadEmployee';

export default function BranchList() {
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

  // Lấy dữ liệu branch từ database
  const { branches, error } = useReadBranch();
  const branch_data = branches;


  const [visible, setVisible] = useState(false);
  const handleVisible = () => {
    setVisible(!visible);
  }

  const navigate = useNavigate();

  // Chuyển hướng đến trang sửa branch và truyền branch cần sửa
  const handleEdit = (branch) => {
    navigate('/management/branch/edit', { state: { branch } });
  }

  // Chuyển hướng đến trang thêm branch
  const handleAdd = () => {
    navigate('/management/branch/add');
  }


  // Xóa branch
  const { deleteBranch } = useDeleteBranch();
  const handleDelete = (branch_id) => {
    deleteBranch(branch_id)
  }

  // lấy dữ liệu nhân viên
  const { employees } = useReadEmployee();
  const employee_data = employees ? employees : [];


  return (
    <table className="branch__list">
      <thead>
        <tr>
          <th>Branch id</th>
          <th>Branch name</th>
          <th>Phone</th>
          <th>Employee</th>
          <th>
            <button className="btn btn-info" onClick={handleAdd}>
              Add branch
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {!error && !branch_data ?
          (<tr><td colSpan="5">There are no branches right now</td></tr>)
          :
          (branch_data?.map((branch, index) => (
            <tr key={index}
              // Hiển thị row được chọn
              onClick={() => handleClick(index)}
              className={index === selectedRow ? 'selected' : ''}
              // Nếu clickCount = 1 thì mở modal
              data-bs-toggle={clickCount === 1 ? "modal" : null} data-bs-target={"#branchListModal" + branch.branch_id}
            >
              <td className="name" >{branch.branch_id}</td>
              <td className="name">{branch.branch_name}</td>
              <td className="extension">{branch.branch_phone}</td>
              <td className="more">{employee_data?.filter(employee => employee.branch_id === branch.branch_id).length}</td>
              <td className="more dropstart" >
                <p data-bs-toggle="dropdown" aria-expanded="false" className="mb-0">
                  <i className="ri-more-fill" />
                </p>
                <ul className="dropdown-menu text-center">
                  <li><button className="w-100 btn edit" onClick={() => { handleEdit(branch) }}>Edit</button></li>
                  <li><button className="w-100 btn delete" onClick={() => { handleDelete(branch.branch_id) }}>Delete</button></li>
                </ul>
              </td>

              {/* Modal */}
              <div className="modal fade branch__modal" id={"branchListModal" + branch.branch_id} tabIndex={- 1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                  <div className="modal-content">
                    <form>
                      <div className="modal-header">
                        <h1 className="modal-title fs-4 ms-3" id="exampleModalLabel">{branch.branch_id}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                      </div>
                      <div className="modal-body">
                        <div className="table table-hover">
                          <tbody>
                            <tr>
                              <th>Name</th>
                              <td>{branch.branch_name}</td>
                            </tr>
                            <tr>
                              <th>Email</th>
                              <td>{branch.branch_email}</td>
                            </tr>
                            <tr>
                              <th>Phone</th>
                              <td>{branch.branch_phone}</td>
                            </tr>
                            <tr>
                              <th>Address</th>
                              <td>{branch.branch_address}</td>
                            </tr>
                            <tr>
                              <th className="align-middle">Create date</th>
                              <td>{moment(branch.branch_create_date).format('DD-MM-YYYY')}
                                <br />
                                {moment().diff(moment(branch.branch_create_date), 'days')} days</td>
                            </tr>
                            <tr>
                              <th>Password</th>
                              <td>
                                <input disabled type={visible ? "text" : "password"} className="text-center border-0" value={branch.branch_password} />
                                {visible ? <i className="fa fa-eye" onClick={handleVisible}></i>
                                  : <i className="fa fa-eye-slash" onClick={handleVisible}></i>}
                              </td>
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
          )
          ))
        }
      </tbody >


    </table >
  );
}