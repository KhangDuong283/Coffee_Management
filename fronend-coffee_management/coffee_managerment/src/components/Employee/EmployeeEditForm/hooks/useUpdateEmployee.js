import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { employeeService } from "../../../../services/EmployeeService";

// Custom hook để tạo một Employee mới
export default function useUpdateEmployee() {
    // Sử dụng useQueryClient để thực hiện các thao tác liên quan đến cache
    const queryClient = useQueryClient();
    // Sử dụng useMutation để tạo một hàm updateEmployee và biến isUpdating
    const { mutate: updateEmployee, isPending: isUpdating } = useMutation({
        mutationFn: ({ employee_id, new_employee }) => employeeService.update(employee_id, new_employee),
        onSuccess: () => {
            toast.success("Update employee successfully!!");

            // Sau khi tạo tài khoản thành công, đánh dấu truy vấn 'employees' là không hợp lệ để làm mới dữ liệu
            queryClient.invalidateQueries('employees');
        },
        onError: () => {
            toast.error("Update employee failed!!");
        },
    })
    return { updateEmployee, isUpdating };
}
