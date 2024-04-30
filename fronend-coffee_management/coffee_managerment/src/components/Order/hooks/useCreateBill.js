import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { billService } from "../../../services/BillService";

// Custom hook để tạo một tài khoản admin mới
export default function useCreateBill() {
    // Sử dụng useQueryClient để thực hiện các thao tác liên quan đến cache
    const queryClient = useQueryClient();
    // Sử dụng useMutation để tạo một hàm createAdmin và biến isCreating
    const { mutate: createBill, isPending: isCreating } = useMutation({
        mutationFn: billService.create,
        onSuccess: () => {
            toast.success("Create bill successfully!!");

            // Sau khi tạo tài khoản thành công, đánh dấu truy vấn 'admins' là không hợp lệ để làm mới dữ liệu
            queryClient.invalidateQueries('bills');
        },
        onError: () => {
            toast.error("Create bills failed!!");
        },
    })
    return { createBill, isCreating };
}
