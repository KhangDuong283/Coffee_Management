import "./ResetPassword.css"
import { useNavigate } from 'react-router-dom'

export default function ResetPassword() {
    const navigate = useNavigate()

    const handleCancel = () => {
        navigate("/management/admin_login");
    }

    const handleSave = () => {
        navigate("/management/admin_login");
    }

    return (
        <div className="reset__password">
            <div className="reset__password__content">
                <p className="title">Reset password</p>
                <form>

                    <div data-mdb-input-init className="form-outline mb-4">
                        <input type="text" id="form2Example1" className="form-control" />
                        <label className="form-label" htmlFor="form2Example1">Username</label>
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                        <input type="password_current" id="form2Example2" className="form-control" />
                        <label className="form-label" htmlFor="form2Example2">Current password</label>
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                        <input type="password_new" id="form2Example2" className="form-control" />
                        <label className="form-label" htmlFor="form2Example2">New password</label>
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                        <input type="password_new_confirm" id="form2Example2" className="form-control" />
                        <label className="form-label" htmlFor="form2Example2">Confirm new password</label>
                    </div>

                    <div className="group__btn">
                        <button onClick={() => { handleCancel() }} type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-danger btn-block ">
                            Cancel
                        </button>

                        <button onClick={() => { handleSave() }} type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block ">
                            Save
                        </button>
                    </div>

                </form>
            </div>

        </div>

    )
}
