import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { adminService } from "../../../../services/AdminService";

// Custom hook để cập nhật mật khẩu admin
export default function useResetPasswordAdmin() {
    // Sử dụng useQueryClient để thực hiện các thao tác liên quan đến cache
    const queryClient = useQueryClient();
    // Sử dụng useMutation để tạo một hàm resetAdminPassword và biến isUpdating
    const { mutate: resetAdminPassword, isPending: isReseting } = useMutation({
        mutationFn: ({ admin_id, new_admin }) => adminService.update(admin_id, new_admin),
        onSuccess: () => {
            toast.success(" Reset admin password successfully!!");

            // Sau khi tạo tài khoản thành công, đánh dấu truy vấn 'admins' là không hợp lệ để làm mới dữ liệu
            queryClient.invalidateQueries('admins');
        },
        onError: () => {
            toast.error("Reset admin password failed!!");
        },
    })
    return { resetAdminPassword, isReseting };
}
