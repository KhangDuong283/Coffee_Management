import { Outlet, useNavigate } from 'react-router-dom'
import PostLogin from '../components/Auth/PostLogin/PostLogin';


export default function Post() {
  const navigate = useNavigate()

  // Hàm kiểm tra trạng thái đăng nhập
  const checkLogin = () => {
    // Kiểm tra trạng thái đăng nhập trong localStorage
    const localStorageAuth = localStorage.getItem('auth_post') === 'true';
    return localStorageAuth;
  }

  if (checkLogin()) {
    return (<Outlet />)
  } else {
    navigate("/post/post_login")
    return (<PostLogin />)
  }
}
