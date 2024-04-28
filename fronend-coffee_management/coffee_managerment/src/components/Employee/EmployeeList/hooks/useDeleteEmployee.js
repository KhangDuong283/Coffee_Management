import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { employeeService } from "../../../../services/EmployeeService";

// Custom hook để xóa một branch 
export default function useDeleteEmployee() {
    // Sử dụng useQueryClient để thực hiện các thao tác liên quan đến cache
    const queryClient = useQueryClient();
    // Sử dụng useMutation để tạo một hàm deleteBranch và biến isDelete
    const { mutate: deleteEmployee, isPending: isDelete } = useMutation({
        mutationFn: employeeService.delete,
        onSuccess: () => {
            toast.success("Delete employee successfully!!");

            // Sau khi tạo tài khoản thành công, đánh dấu truy vấn 'branches' là không hợp lệ để làm mới dữ liệu
            queryClient.invalidateQueries('branches');
        },
        onError: () => {
            toast.error("Delete employee failed!!");
        },
    })
    return { deleteEmployee, isDelete };
}
