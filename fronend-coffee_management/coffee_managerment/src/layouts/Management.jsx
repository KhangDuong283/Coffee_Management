import { Outlet, useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux';
import Login from '../components/Auth/Login/Login';



export default function Management() {
    const navigate = useNavigate()

    // Lấy trạng thái đăng nhập từ store
    const auth = useSelector(state => state.Auth)

    // Hàm kiểm tra trạng thái đăng nhập
    const checkLogin = () => {
        // Kiểm tra trạng thái đăng nhập trong localStorage
        const localStorageAuth = localStorage.getItem('auth') === 'true';
        return auth || localStorageAuth;
    }

    if (checkLogin() === true) {
        return (<Outlet />)
    } else {
        navigate("/management/admin_login")
        return (<Login />)
    }
}
