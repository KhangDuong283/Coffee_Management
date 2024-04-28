import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { employeeService } from "../../../../services/EmployeeService";

// Custom hook để tạo một employee mới
export default function useCreateEmployee() {
    // Sử dụng useQueryClient để thực hiện các thao tác liên quan đến cache
    const queryClient = useQueryClient();
    // Sử dụng useMutation để tạo một hàm createEmployee và biến isCreating
    const { mutate: createEmployee, isPending: isCreating } = useMutation({
        mutationFn: employeeService.create,
        onSuccess: () => {
            toast.success("Create employee successfully!!");

            // Sau khi tạo tài khoản thành công, đánh dấu truy vấn 'employees' là không hợp lệ để làm mới dữ liệu
            queryClient.invalidateQueries('employees');
        },
        onError: () => {
            toast.error("Create employee failed!!");
        },
    })
    return { createEmployee, isCreating };
}
