
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useNavigate } from "react-router-dom";
import useCreateEmployee from './hooks/useCreateEmployee';
import useReadBranch from "../../Branch/BranchList/hooks/useReadBranch";
export default function EmployeeAddForm() {
    // navigate 
    const navigate = useNavigate();
    const handleCancel = () => {
        navigate("/management/employee");
    }

    // form
    const form = useForm({
        defaultValues: {
            employee_name: "",
            employee_address: "",
            employee_email: "",
            employee_phone: "",
            employee_salary: "",
            branch_id: "",
            employee_position: "",
        }
    });
    const { register, control, handleSubmit, formState, setValue, reset, watch } = form;
    const { errors } = formState;

    // Gọi hook useCreateEmployee để lấy ra hàm createEmployee và biến trạng thái isCreating
    const { createEmployee, isCreating } = useCreateEmployee();

    // Hàm xử lý sự kiện khi người dùng ấn nút submit
    const formSubmit = (data) => {
        createEmployee(data);
        reset();
        navigate("/management/employee");
    }


    // Lấy tên branch từ branch_id
    const { branches } = useReadBranch();
    const branch_data = branches;



    const textBtn = isCreating ? "Loading..." : "Submit";

    return (
        <div className="add__employee">
            <form onSubmit={handleSubmit(formSubmit)}>
                <div className="row mb-3">
                    {/* Name */}
                    <div className="col-4">
                        <label htmlFor="employee_name" className="form-label">Employee name</label>
                        <input {...register("employee_name", {
                            required: {
                                value: true,
                                message: "Employee name is required"
                            }
                        })} autoFocus type="text" id="employee_name" name="employee_name" className="form-control" />
                        <small className="text-danger fst-italic">{errors.employee_name?.message}</small>
                    </div>

                    {/* Age */}
                    <div className="col-4">
                        <label htmlFor="employee_age" className="form-label">Employee age</label>
                        <input {...register("employee_age")} type="text" id="employee_age" name="employee_age" className="form-control" />
                        <small className="text-danger fst-italic">{errors.employee_age?.message}</small>
                    </div>
                </div>

                <div className="row mb-3">
                    {/* Email */}
                    <div className="col-4">
                        <label htmlFor="employee_email" className="form-label">Employee email</label>
                        <input {...register("employee_email", {
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
                        })} type="text" id="employee_email" name="employee_email" className="form-control" />
                        <small className="text-danger fst-italic">{errors.employee_email?.message}</small>
                    </div>

                    {/* Phone */}
                    <div className="col-4">
                        <label htmlFor="employee_phone" className="form-label">Employee phone</label>
                        <input {...register("employee_phone")} type="text" id="employee_phone" name="employee_phone" className="form-control" />
                    </div>
                </div>

                <div className="row mb-3">
                    {/* Position */}
                    <div className="col-4">
                        <label htmlFor="employee_position" className="form-label me-3">Choose position</label>
                        <select id="employee_position" className="text-center" {...register("employee_position", {
                            required: {
                                value: true,
                                message: "Employee position is required"
                            }
                        })}>
                            <option value="">Select a position</option>
                            <option value="Cashier">Cashier</option>
                            <option value="Server">Server</option>
                            <option value="Barista">Barista</option>
                        </select>
                        <br />
                        <small className="text-danger fst-italic">{errors.employee_position?.message}</small>
                    </div>

                    {/* Branch */}
                    <div className="col-4">
                        <label htmlFor="branch_id" className="form-label me-3">Choose branch</label>
                        <select id="branch_id" className="text-center" {...register("branch_id")}>
                            <option value="">Select a branch</option>
                            <br />
                            {!branch_data ?
                                (
                                    <option value="">No branch</option>
                                )
                                :
                                (
                                    branch_data.map((branch) => (
                                        <option key={branch.branch_id} value={branch.branch_id}>{branch.branch_name}</option>
                                    ))
                                )
                            }
                        </select>
                        <br />
                        <small className="text-danger fst-italic">{errors.branch_id?.message}</small>
                    </div>
                </div>

                <div className="row mb-3">
                    {/* Salary */}
                    <div className="col-4">
                        <label htmlFor="employee_salary" className="form-label">Employee salary</label>
                        <input {...register("employee_salary", {
                            required: {
                                value: true,
                                message: "Employee salary is required"
                            }
                        })} autoFocus type="text" id="employee_salary" name="employee_salary" className="form-control" />
                        <small className="text-danger fst-italic">{errors.employee_salary?.message}</small>
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
