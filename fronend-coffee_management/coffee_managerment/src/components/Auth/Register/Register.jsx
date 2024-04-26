import { useState } from 'react';
import "./Register.css"
import { NavLink } from 'react-router-dom'
import useCreateAdmin from './hooks/useCreateAdmin';
import Validation from './Validation';
import ErrorValidate from '../ErrorValidate/ErrorValidate';
import useReadAdmin from './hooks/useReadAdmin';


export default function Register() {
    // Gọi hook useCreateAdmin để lấy ra hàm createAdmin và biến trạng thái isCreating
    const { createAdmin, isCreating } = useCreateAdmin();

    // Gọi hook useReadAdmin để lấy ra danh sách admin trên hệ thống
    const { admins } = useReadAdmin();
    const admins_data = admins;

    // Khai báo state error để lưu trữ các lỗi
    const [error, setError] = useState({});

    // Khai báo state form để lưu trữ dữ liệu người dùng nhập vào
    const [values, setValues] = useState({
        admin_username: '',
        admin_password: '',
        admin_password_confirm: ''
    });

    // Hàm xử lý sự kiện khi người dùng nhập dữ liệu vào input
    const handleInputChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    // Hàm xử lý sự kiện khi người dùng ấn nút đăng ký
    const handleRegister = (event) => {
        event.preventDefault();

        // Kiểm tra dữ liệu người dùng nhập vào
        const errors = Validation(values, admins_data);
        setError(errors);
        if (Object.keys(errors).length > 0) return;

        // Khi thõa các kiểm định bên trên thì gọi hàm createAdmin từ hook useCreateAdmin để tạo tài khoản admin
        createAdmin(values);

        // Xóa thông tin trên form nếu taọ tài khoản thành công
        setValues({ ...values, admin_username: '', admin_password: '', admin_password_confirm: '' });

    }

    // Biến textBtn sẽ hiển thị nội dung trên nút đăng ký tùy thuộc vào biến isCreating
    const textBtn = isCreating ? "Loading..." : "Register";

    return (
        <div className="register">
            <div className="register__content">
                <p className="title">Admin register</p>

                {/* Gọi hàm HandleRegister khi người dùng ấn nút đăng ký */}
                <form onSubmit={handleRegister}>

                    <div data-mdb-input-init className="form-outline mb-4">
                        <input value={values.admin_username} name="admin_username" type="text" id="form2Example1" className="form-control" onChange={handleInputChange} />
                        <label className="form-label" htmlFor="form2Example1">Username</label>
                        {ErrorValidate(error, 'admin_username')}
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                        <input value={values.admin_password} name="admin_password" type="password" id="form2Example2" className="form-control" onChange={handleInputChange} />
                        <label className="form-label" htmlFor="form2Example2">Password</label>
                        {ErrorValidate(error, 'admin_password')}
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                        <input value={values.admin_password_confirm} name="admin_password_confirm" type="password" id="form2Example3" className="form-control" onChange={handleInputChange} />
                        <label className="form-label" htmlFor="form2Example3">Confirm password</label>
                        {ErrorValidate(error, 'admin_password_confirm')}
                    </div>

                    <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">{textBtn}</button>

                    {/* Điều hướng */}
                    <div className="text-center">
                        <p>You have an account? <NavLink to="/management/admin_login">Login now</NavLink></p>
                        <p>Forgot your password? <NavLink to="/management/reset_password">Reset password</NavLink></p>
                    </div>

                </form>
            </div>
        </div>
    )
}