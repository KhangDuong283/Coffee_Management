import { useMutation, useQueryClient } from "@tanstack/react-query";

// import { toast } from "react-toastify";
import { billProductService } from "../../../services/BillProductService";

// Custom hook để tạo một tài khoản admin mới
export default function useCreateBillProduct() {
    // Sử dụng useQueryClient để thực hiện các thao tác liên quan đến cache
    const queryClient = useQueryClient();
    // Sử dụng useMutation để tạo một hàm createAdmin và biến isCreating
    const { mutate: createBillProduct, isPending: isCreating } = useMutation({
        mutationFn: billProductService.create,
        onSuccess: () => {
            // toast.success("Create bill products successfully!!");

            // Sau khi tạo tài khoản thành công, đánh dấu truy vấn 'admins' là không hợp lệ để làm mới dữ liệu
            queryClient.invalidateQueries('billproducts');
        },
        onError: () => {
            // toast.error("Create bill products failed!!");
        },
    })
    return { createBillProduct, isCreating };
}
