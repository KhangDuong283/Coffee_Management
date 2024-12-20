import "./Header.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useReadAdmin from "../../components/Auth/Register/hooks/useReadAdmin";
import useReadBranch from "../../components/Branch/BranchList/hooks/useReadBranch";
import { useDispatch } from 'react-redux';
import { selectBranch } from "./branchSlice";

export default function Header() {

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('auth');

    navigate("/management/admin_login")
    toast.info("Logout success")
  }

  // Lấy dữ liệu admin từ redux store
  // const userInfor = useSelector(state => state.user.userInfo)
  // const username = userInfor ? userInfor.admin_username : null;
  // Mới đầu định lưu vô redux store nhưng mà load lại trang sẽ mất phiên đăng nhập

  const username = localStorage.getItem('username');

  // Lấy dữ liệu admin từ hook useReadAdmin dựa vào username lấy từ redux store
  const { admins } = useReadAdmin();
  const admin = admins ? admins.find(admin => admin.admin_username === username) : null;
  const id = admin ? admin.admin_id : null;

  const { branches } = useReadBranch();
  const branch_data = branches ? branches : [];

  const dispatch = useDispatch();

  const handleSelectBranch = (event) => {
    dispatch(selectBranch(event.target.value));
  }


  return (
    <div className="right-section">
      <div className="header">

        <select className="form-select form-select-lg select" aria-label="Large select example" onChange={handleSelectBranch}>
          <option selected value="">All branch</option>
          {branch_data.map((branch, index) => (
            <option key={index} value={branch.branch_id}>{branch.branch_name}</option>
          ))}
        </select>


        <select className="form-select form-select-lg language" aria-label="Large select example">
          <option value={1}>EN</option>
          <option value={2}>VI</option>
        </select>

        <div className="profile" data-bs-toggle="dropdown" aria-expanded="false">
          <div className="info">
            <img src="/src/assets/img/avtRoot.jpg" alt='hi' />
            <div className="account">
              <p>{id}</p>
              <h5>{username}</h5>
            </div>
          </div>
          <i className="ri-arrow-down-s-line" />
          <ul className="dropdown-menu dropdown-menu-end">
            <li><a className="dropdown-item" href="#1">Profile</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#1" onClick={handleLogout}>Logout</a></li>
          </ul>
        </div>



        <div className="icon-btns">
          <i className="ri-menu-line" id="menu-btn" />
        </div>

      </div>
    </div >
  )
}
