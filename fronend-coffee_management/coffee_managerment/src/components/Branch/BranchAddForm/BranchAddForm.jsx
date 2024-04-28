
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useNavigate } from "react-router-dom";
import useCreateBranch from "./hooks/useCreateBranch";
export default function BranchAddForm() {
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
    const { register, control, handleSubmit, formState, setValue, reset, watch } = form;
    const { errors } = formState;

    // Gọi hook useCreateBranch để lấy ra hàm createBranch và biến trạng thái isCreating
    const { createBranch, isCreating } = useCreateBranch();

    // Hàm xử lý sự kiện khi người dùng ấn nút submit
    const formSubmit = (data) => {
        createBranch(data);
        reset();
        navigate("/management/branch");
    }

    const textBtn = isCreating ? "Loading..." : "Submit";
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

                {/* Password gruop */}
                <div className="row mb-3">
                    {/* Password */}
                    <div className="col-4">
                        <label htmlFor="branch_password" className="form-label">Branch password</label>
                        <input {...register("branch_password", {
                            required: {
                                value: true,
                                message: "Branch password is required"
                            },
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters"
                            }
                        })} type="password" id="branch_password" name="branch_password" className="form-control" />
                        <small className="text-danger fst-italic">{errors.branch_password?.message}</small>
                    </div>

                    {/* Confirm password */}
                    <div className="col-4">
                        <label htmlFor="branch_confirm_password" className="form-label">Branch confirm password</label>
                        <input {...register("branch_confirm_password", {
                            required: {
                                value: true,
                                message: "Branch confirm password is required"
                            },
                            validate: {
                                matchPassword: (inputValues) => {
                                    return (
                                        inputValues === watch("branch_password")
                                        || "Password does not match"
                                    );
                                }
                            }
                        })} type="password" id="branch_confirm_password" name="branch_confirm_password" className="form-control" />
                        <small className="text-danger fst-italic">{errors.branch_confirm_password?.message}</small>
                    </div>
                </div>


                <button onClick={handleCancel} type="button" className="btn btn-danger me-3 mt-4">Cancel</button>
                <button onClick={() => reset()} type="button" className="btn btn-warning me-3 mt-4">Reset</button>
                <button type="submit" className="btn btn-success">{textBtn}</button>
            </form>
            {/* <DevTool control={control} /> */}
        </div>
    )
}
