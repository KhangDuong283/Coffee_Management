import "./Header.css";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from "../../components/Auth/Login/AuthSlice.js"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Header() {
  // const auth = useSelector(state => state.Auth)
  const dispatch = useDispatch();

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('auth');
    dispatch(logout());

    navigate("/management/admin_login")
    toast.info("Logout success")
  }

  return (
    <div className="right-section">
      <div className="header">

        <select className="form-select form-select-lg select" aria-label="Large select example">
          <option selected>All branch</option>
          <option value={1}>One</option>
          <option value={2}>Two</option>
          <option value={3}>Three</option>
        </select>


        <select className="form-select form-select-lg language" aria-label="Large select example">
          <option value={1}>EN</option>
          <option value={2}>VI</option>
        </select>

        <div className="profile" data-bs-toggle="dropdown" aria-expanded="false">
          <div className="info">
            <img src="../src/assets/img/avtRoot.jpg" alt='hi' />
            <div className="account">
              <h5>Reza MK</h5>
              <p>Exapmle@gmail.com</p>
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
    </div>
  )
}
