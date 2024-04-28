import "./PostLogin.css"
import { NavLink } from 'react-router-dom'

export default function PostLogin() {
    const handlePostLogin = () => {
        console.log("Login to the sales page");
    }
    return (
        <div className="post__login">
            <div className="post__login__content">
                <p className="title">Post login</p>
                <form>

                    <div data-mdb-input-init className="form-outline mb-4">
                        <input name="branch_id" type="text" id="form2Example1" className="form-control" />
                        <label className="form-label" htmlFor="form2Example1">Branch id</label>
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                        <input name="branch_password" type="password" id="form2Example2" className="form-control" />
                        <label className="form-label" htmlFor="form2Example2">Branch password</label>
                    </div>


                    <button onClick={() => { handlePostLogin() }} type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-info btn-block mb-4">
                        Login
                    </button>

                    <div className="text-center">
                        <p className="my-2">Login to the admin page <NavLink to="/management/admin_login">Admin login</NavLink></p>
                    </div>
                </form>
            </div>

        </div>

    )
}
