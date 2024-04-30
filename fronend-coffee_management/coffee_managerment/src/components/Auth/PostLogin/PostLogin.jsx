import { toast } from "react-toastify";
import "./PostLogin.css"
import { NavLink, useNavigate } from 'react-router-dom'
import useReadBranch from "../../Branch/BranchList/hooks/useReadBranch";
import { useForm } from "react-hook-form";

export default function PostLogin() {
    const navigate = useNavigate()

    // Lấy dữ liệu branch từ database
    const { branches } = useReadBranch();
    const branch_data = branches ? branches : [];

    // form
    const form = useForm({
        defaultValues: {
            branch_id: "",
            branch_password: ""
        }
    });

    const { register, handleSubmit, formState } = form;
    const { errors } = formState;

    const formSubmit = (data) => {

        // Lưu trạng thái đăng nhập vào localStorage
        localStorage.setItem('auth_post', 'true');

        // Lưu branch data vào localStorage
        localStorage.setItem('branch_id', data.branch_id);


        // Nếu không có lỗi thì chuyển hướng đến trang post
        toast.success("Post login success")
        navigate("/post/order")
    }
    return (
        <div className="post__login">
            <div className="post__login__content">
                <p className="title">Post login</p>
                <form onSubmit={handleSubmit(formSubmit)}>

                    <div data-mdb-input-init className="form-outline mb-4">
                        <label htmlFor="branch_id" className="form-label">Branch name</label>
                        <input {...register("branch_id", {
                            required: {
                                value: true,
                                message: "Branch id is required"
                            }, validate: {
                                checkBranch:
                                    (inputValue) => {
                                        return branch_data.find(branch => branch.branch_id === inputValue) || "Branch id does not exist"
                                    }
                            }
                        })} autoFocus type="text" id="branch_id" name="branch_id" className="form-control" />
                        <small className="text-danger fst-italic">{errors.branch_id?.message}</small>
                    </div>

                    <div data-mdb-input-init className="form-outline mb-4">
                        <input name="branch_password" type="password" id="form2Example2" className="form-control" />
                        <label className="form-label" htmlFor="form2Example2">Branch password</label>
                    </div>


                    <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-info btn-block mb-4">
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
