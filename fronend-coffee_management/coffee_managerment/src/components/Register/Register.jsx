import "./Register.css"
import { NavLink } from 'react-router-dom'
export default function Register() {
    const handleRegister = () => {
        console.log("Register as admin");
    }

    return (
        <div className="register">
            <div className="register__content">
                <p className="title">Admin register</p>
                <form>

                    <div data-mdb-input-init className="form-outline mb-4">
                        <input name="admin_username" type="text" id="form2Example1" className="form-control" />
                        <label className="form-label" htmlFor="form2Example1">Username</label>
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                        <input name="admin_password" type="password" id="form2Example2" className="form-control" />
                        <label className="form-label" htmlFor="form2Example2">Password</label>
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                        <input name="admin_password_confirm" type="password" id="form2Example2" className="form-control" />
                        <label className="form-label" htmlFor="form2Example2">Confirm password</label>
                    </div>

                    <button onClick={() => { handleRegister() }} type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">
                        Sign up
                    </button>

                    <div className="text-center">
                        <p>You have an account? <NavLink to="/management/admin_login">Login now</NavLink></p>
                        <p>Forgot your password? <NavLink to="/management/reset_password">Reset password</NavLink></p>
                    </div>
                </form>
            </div>

        </div>

    )
}
