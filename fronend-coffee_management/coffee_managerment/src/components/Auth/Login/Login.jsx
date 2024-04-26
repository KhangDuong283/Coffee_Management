/* eslint-disable react-hooks/exhaustive-deps */
import "./Login.css"
import { NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"
import Validation from "./Validation"
import { toast } from "react-toastify"
import {  useDispatch, useSelector } from "react-redux"
import useReadAdmin from "../Register/hooks/useReadAdmin"
import { login } from "./AuthSlice"
import ErrorValidate from "../ErrorValidate/ErrorValidate"
export default function Login() {
    // Gọi hook useReadAdmin để lấy ra danh sách admin trên hệ thống
    const { admins } = useReadAdmin();
    const admins_data = admins;

    // Khai báo state form để lưu trữ dữ liệu người dùng nhập vào
    const [values, setValues] = useState({
        admin_username: "",
        admin_password: ""
    })

    const navigate = useNavigate()

    // Khai báo state error để lưu trữ các lỗi
    const [errors, setErrors] = useState({})

    const dispatch = useDispatch();

    // Kiểm tra lỗi và cập nhật stateError
    const handleLogin = (event) => {
        event.preventDefault();
        // Kiểm tra dữ liệu người dùng nhập vào
        const errors = Validation(values, admins_data)
        setErrors(errors);

        if (Object.keys(errors).length > 0) return;

        const action = login();
        dispatch(action)

        // Lưu trạng thái đăng nhập vào localStorage
        localStorage.setItem('auth', 'true');



        // Nếu không có lỗi thì chuyển hướng đến trang dashboard
        toast.success("Login success")
        navigate("/management/dashboard")
    }

    // Hàm xử lý sự kiện khi người dùng nhập dữ liệu vào input
    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }

    return (
        <div className="admin__login">
            <div className="login__content">
                <p className="title">Admin login</p>
                <form onSubmit={handleLogin}>
                    <div data-mdb-input-init className="form-outline mb-4">
                        <input value={values.admin_username} onChange={handleChange} name="admin_username" type="text" id="form2Example1" className="form-control form__control" />
                        <label className="form-label" htmlFor="form2Example1">Username</label>
                        {ErrorValidate(errors, 'admin_username')}
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                        <input value={values.admin_password} onChange={handleChange} name="admin_password" type="password" id="form2Example2" className="form-control form__control" />
                        <label className="form-label" htmlFor="form2Example2">Password</label>
                        {ErrorValidate(errors, 'admin_password')}
                    </div>


                    <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">
                        Login as admin
                    </button>

                    <div className="text-center">
                        <p className="m-0">Not a member? <NavLink to="/management/admin_register">Register</NavLink></p>
                        <p className="m-0 mb-2">Forgot your password? <NavLink to="/management/reset_password">Reset password</NavLink></p>
                        <p>or sign up with:</p>
                        <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                            <i className="fab fa-facebook-f" />
                        </button>
                        <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                            <i className="fab fa-google" />
                        </button>
                        <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                            <i className="fab fa-twitter" />
                        </button>
                        <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                            <i className="fab fa-github" />
                        </button>

                        <p className="my-2">Login to the sales page <NavLink to="/post/post_login">Post login</NavLink></p>
                    </div>
                </form>
            </div>

        </div>

    )
}
