import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Login from '../components/Auth/Login/Login';

export default function Management() {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('auth') === 'true';

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/management/admin_login");
        }
    }, [isLoggedIn, navigate]);

    return isLoggedIn ? <Outlet /> : <Login />;
}