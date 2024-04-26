import { useState } from "react";
import "./ResetPassword.css"
import { useNavigate } from 'react-router-dom'
import Validation from "./Validation";
import useReadAdmin from "../Register/hooks/useReadAdmin";
import ErrorValidate from './../ErrorValidate/ErrorValidate';
import useResetPasswordAdmin from "./hooks/useResetPasswordAdmin";

export default function ResetPassword() {
    const navigate = useNavigate()

    const handleCancel = () => {
        navigate("/management/admin_login");
    }

    // Khai báo state error để lưu trữ các lỗi
    const [errors, setError] = useState({});

    // Khai báo state form để lưu trữ dữ liệu người dùng nhập vào
    const [values, setValues] = useState({
        admin_username: '',
        admin_password: '',
        current_password: '',
        new_password: '',
        new_password_confirm: '',
        
    });

    // Hàm xử lý sự kiện khi người dùng nhập dữ liệu vào input
    const handleInputChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    // Gọi hook useReadAdmin để lấy ra danh sách admin trên hệ thống
    const { admins } = useReadAdmin();
    const admins_data = admins;

    const { resetAdminPassword, isReseting } = useResetPasswordAdmin();

    const handleSave = (event) => {
        event.preventDefault();
        // Kiểm tra dữ liệu người dùng nhập vào
        const errors = Validation(values, admins_data);
        setError(errors);
        if (Object.keys(errors).length > 0) return;

        const admin_id = admins_data.find(admin => admin.admin_username === values.admin_username).admin_id;
        values.admin_password = values.new_password;
        
        resetAdminPassword({ admin_id: admin_id, new_admin: values });

        navigate("/management/admin_login");
    }

    const btnText = isReseting ? "Saving..." : "Save";

    return (
        <div className="reset__password">
            <div className="reset__password__content">
                <p className="title">Reset password</p>
                <form onSubmit={handleSave}>

                    <div data-mdb-input-init className="form-outline mb-4">
                        <input name="admin_username" type="text" id="form2Example1" className="form-control" onChange={handleInputChange} />
                        <label className="form-label" htmlFor="form2Example1">Username</label>
                        {ErrorValidate(errors, 'admin_username')}
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                        <input name="current_password" type="password" id="form2Example2" className="form-control" onChange={handleInputChange} />
                        <label className="form-label" htmlFor="form2Example2">Current password</label>
                        {ErrorValidate(errors, 'current_password')}
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                        <input name="new_password" type="password" id="form2Example2" className="form-control" onChange={handleInputChange} />
                        <label className="form-label" htmlFor="form2Example2">New password</label>
                        {ErrorValidate(errors, 'new_password')}
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                        <input name="new_password_confirm" type="password" id="form2Example2" className="form-control" onChange={handleInputChange} />
                        <label className="form-label" htmlFor="form2Example2">Confirm new password</label>
                        {ErrorValidate(errors, 'new_password_confirm')}
                    </div>

                    <div className="group__btn">
                        <button onClick={() => { handleCancel() }} type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-danger btn-block ">
                            Cancel
                        </button>

                        <button data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block ">
                            {btnText}
                        </button>
                    </div>

                </form>
            </div>

        </div>

    )
}
