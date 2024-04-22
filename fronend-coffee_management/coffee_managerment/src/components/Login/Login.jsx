/* eslint-disable react-hooks/exhaustive-deps */
import "./Login.css"
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from "react"
import Validation from "./Validation"
import ErrorValidate from "../ErrorValidate/ErrorValidate"
export default function Login() {
    const [values, setValues] = useState({
        admin__username: "",
        admin__password: ""
    })

    const [errors, setErrors] = useState({})

    // Kiểm tra lỗi và cập nhật stateError
    const handleLogin = (e) => {
        e.preventDefault();
        setErrors(Validation(values));
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    // Môi khi mảng errors thay đổi thì thực hiện hàm này
    useEffect(() => {
        if (Object.keys(errors).length === 0 && (values.admin__username !== "" || values.admin__password !== "")) {
            alert("Login successfully")
        }
    }, [errors])

    return (
        <div className="admin__login">
            <div className="login__content">
                <p className="title">Admin login</p>
                <form onSubmit={handleLogin}>
                    <div data-mdb-input-init className="form-outline mb-4">
                        <input value={values.admin__username} onChange={handleChange} name="admin__username" type="text" id="form2Example1" className="form-control form__control" />
                        <label className="form-label" htmlFor="form2Example1">Username</label>
                        {ErrorValidate(errors, 'admin__username')}
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                        <input value={values.admin__password} onChange={handleChange} name="admin__password" type="password" id="form2Example2" className="form-control form__control" />
                        <label className="form-label" htmlFor="form2Example2">Password</label>
                        {ErrorValidate(errors, 'admin__password')}
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
