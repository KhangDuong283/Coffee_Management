import "./BranchList.css"
import { useState } from 'react';
import Employee from './../../../pages/Management/Employee/Employee';
import useReadBranch from "./hooks/useReadBranch";

export default function BranchList() {
  // Khai báo state selectedRow để lưu trữ index của row được chọn
  const [selectedRow, setSelectedRow] = useState(null);
  // Tạo hiệu ứng select row khi click vào row
  const handleClick = (rowIndex) => {
    setSelectedRow(rowIndex);
  };

  // Xử lý sự kiện double click vào row
  const handleDoubleClick = (branch_id) => {
    console.log(branch_id);
  };

  // Lấy dữ liệu branch từ database
  const { branches } = useReadBranch();
  const branch_data = branches;
  // console.log(branch_data);

  return (
    <table className="branch__list">
      <thead>
        <tr>
          <th >Branch id</th>
          <th>Branch name</th>
          <th>Phone</th>
          <th>Employee</th>
          <th>
            <button className="btn btn-info">
              Add branch
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {branch_data?.map((branch, index) => (
          <tr key={index}
            // Hiển thị row được chọn
            onClick={() => handleClick(index)}
            className={index === selectedRow ? 'selected' : ''}
          >
            <td className="name" data-bs-toggle="modal" data-bs-target="#exampleModal">
              <span>
                {branch.branch_id}
              </span>
            </td>
            <td className="name">{branch.branch_name}</td>
            <td className="extension">{branch.branch_phone}</td>
            <td className="more">5</td>

            <td className="more dropstart" >
              <p data-bs-toggle="dropdown" aria-expanded="false" className="mb-0">
                <i className="ri-more-fill" />
              </p>
              <ul className="dropdown-menu text-center">
                <li><button className="w-100 btn edit" href="#">Edit</button></li>
                <li><button className="w-100 btn delete" href="#">Delete</button></li>
              </ul>
            </td>

          </tr>
        ))}
      </tbody>
      {/* Modal */}
      <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              ...
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>

    </table>
  );
}