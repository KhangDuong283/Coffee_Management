import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { adminService } from './../../../../services/AdminService';

// Custom hook để tạo một tài khoản admin mới
export default function useCreateAdmin() {
    // Sử dụng useQueryClient để thực hiện các thao tác liên quan đến cache
    const queryClient = useQueryClient();
    // Sử dụng useMutation để tạo một hàm createAdmin và biến isCreating
    const { mutate: createAdmin, isPending: isCreating } = useMutation({
        mutationFn: adminService.create,
        onSuccess: () => {
            toast.success("Create admin account successfully!!");

            // Sau khi tạo tài khoản thành công, đánh dấu truy vấn 'admins' là không hợp lệ để làm mới dữ liệu
            queryClient.invalidateQueries('admins');
        },
        onError: () => {
            toast.error("Create admin account failed!!");
        },
    })
    return { createAdmin, isCreating };
}
