import { Outlet, useNavigate } from 'react-router-dom'

import Login from '../components/Auth/Login/Login';



export default function Management() {
    const navigate = useNavigate()

    // Hàm kiểm tra trạng thái đăng nhập
    const checkLogin = () => {
        // Kiểm tra trạng thái đăng nhập trong localStorage
        const localStorageAuth = localStorage.getItem('auth') === 'true';
        return localStorageAuth;
    }

    if (checkLogin()) {
        return (<Outlet />)
    } else {
        navigate("/management/admin_login")
        return (<Login />)
    }
}
