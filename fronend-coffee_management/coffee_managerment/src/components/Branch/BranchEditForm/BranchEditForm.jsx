
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useLocation, useNavigate } from "react-router-dom";
import useUpdateBranch from "./hooks/useUpdateBranch";
import { useEffect, useState } from "react";
export default function BranchEditForm() {
    // navigate 
    const navigate = useNavigate();
    const handleCancel = () => {
        navigate("/management/branch");
    }

    // form
    const form = useForm({
        defaultValues: {
            branch_name: "",
            branch_address: "",
            branch_email: "",
            branch_phone: "",
            branch_password: "",
            branch_confirm_password: ""
        }
    });
    const { register, handleSubmit, formState, setValue, reset, watch } = form;
    const { errors } = formState;

    // Lấy branch từ trang trước 
    const location = useLocation();
    const branch = location.state.branch;
    const branch_id = branch.branch_id;

    // Set giá trị mặc định cho form từ branch được truyền xuống qua location
    useEffect(() => {
        setValue("branch_name", branch.branch_name);
        setValue("branch_address", branch.branch_address);
        setValue("branch_email", branch.branch_email);
        setValue("branch_phone", branch.branch_phone);
    }, [branch, setValue]);

    const password = branch.branch_password;

    // Gọi hook useCreateBranch để lấy ra hàm createBranch và biến trạng thái isCreating
    const { updateBranch, isUpdating } = useUpdateBranch();

    // Hàm xử lý sự kiện khi người dùng ấn nút submit
    const formSubmit = (data) => {
        if (changePassword === false) {
            data.branch_password = password;
        } else {
            data.branch_password = data.new_password;
        }
        updateBranch({ branch_id: branch_id, new_branch: data });
    }

    const [changePassword, setChangePassword] = useState(false);
    const handleShowInput = () => {
        setChangePassword(!changePassword);
    }


    const textBtn = isUpdating ? "Updating..." : "Update";

    return (
        <div className="add__branch">
            <form onSubmit={handleSubmit(formSubmit)}>
                <div className="row mb-3">
                    {/* Name */}
                    <div className="col-4">
                        <label htmlFor="branch_name" className="form-label">Branch name</label>
                        <input {...register("branch_name", {
                            required: {
                                value: true,
                                message: "Branch name is required"
                            }
                        })} autoFocus type="text" id="branch_name" name="branch_name" className="form-control" />
                        <small className="text-danger fst-italic">{errors.branch_name?.message}</small>
                    </div>

                    {/* Address */}
                    <div className="col-7">
                        <label htmlFor="branch_address" className="form-label">Branch address</label>
                        <input {...register("branch_address", {
                            // required: {
                            //     value: true,
                            //     message: "Branch address is required"
                            // }
                        })} type="text" id="branch_address" name="branch_address" className="form-control" />
                        <small className="text-danger fst-italic">{errors.branch_address?.message}</small>
                    </div>
                </div>

                <div className="row mb-3">
                    {/* Email */}
                    <div className="col-4">
                        <label htmlFor="branch_email" className="form-label">Branch email</label>
                        <input {...register("branch_email", {
                            pattern: {
                                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                                message: "Invalid email format"
                            },
                            validate: {
                                emailExist: (inputValues) => {
                                    return (
                                        inputValues !== "khang@gmail.com"
                                        || "Email is already taken"
                                    );
                                },
                                bannedEmail: (inputValues) => {
                                    return (
                                        inputValues !== "khangxautrai@gmail.com"
                                        || "This email is not allowed"
                                    )
                                }
                            }
                        })} type="text" id="branch_email" name="branch_email" className="form-control" />
                        <small className="text-danger fst-italic">{errors.branch_email?.message}</small>
                    </div>

                    {/* Phone */}
                    <div className="col-4">
                        <label htmlFor="branch_phone" className="form-label">Branch phone</label>
                        <input {...register("branch_phone")} type="text" id="branch_phone" name="branch_phone" className="form-control" />
                    </div>
                </div>

                {/* Password group */}
                {changePassword === false ? (
                    ""
                ) : (
                    <div className="row mb-3 password__group">
                        {/* Current password */}
                        <div className="col-4">
                            <label htmlFor="branch_password" className="form-label">Current branch password</label>
                            <input {...register("branch_password", {
                                required: {
                                    value: true,
                                    message: "Branch password is required"
                                },
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                },
                                validate: {
                                    wrongPassword: (inputValues) => {
                                        return (
                                            inputValues === password
                                            || "Password is incorrect"
                                        );
                                    }
                                }
                            })} type="password" id="branch_password" name="branch_password" className="form-control" />
                            <small className="text-danger fst-italic">{errors.branch_password?.message}</small>
                        </div>

                        {/* New password */}
                        <div className="col-4">
                            <label htmlFor="new_password" className="form-label">New branch password</label>
                            <input {...register("new_password", {
                                required: {
                                    value: true,
                                    message: "New password is required"
                                },
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                }
                            })} type="password" id="new_password" name="new_password" className="form-control" />
                            <small className="text-danger fst-italic">{errors.new_password?.message}</small>
                        </div>

                        {/* Confirm new password */}
                        <div className="col-4">
                            <label htmlFor="confirm_new_password" className="form-label">Confirm new branch password</label>
                            <input {...register("confirm_new_password", {
                                required: {
                                    value: true,
                                    message: "Branch confirm password is required"
                                },
                                validate: {
                                    matchPassword: (inputValues) => {
                                        return (
                                            inputValues === watch("new_password")
                                            || "Password does not match"
                                        );
                                    }
                                }
                            })} type="password" id="confirm_new_password" name="confirm_new_password" className="form-control" />
                            <small className="text-danger fst-italic">{errors.confirm_new_password?.message}</small>
                        </div>

                    </div>

                )}
                {changePassword === false ? (
                    <button type="button" className="btn btn-primary me-3 mt-4" onClick={handleShowInput}>Change password</button>
                ) : (
                    <button type="button" className="btn btn-info me-3 mt-4 " onClick={handleShowInput}>Close change password</button>
                )}

                <button onClick={handleCancel} type="button" className="btn btn-danger me-3 mt-4">Cancel</button>
                <button type="submit" className="btn btn-success">{textBtn}</button>
            </form >
        </div >
    )
}
