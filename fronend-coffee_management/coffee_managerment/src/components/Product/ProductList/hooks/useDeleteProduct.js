import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { productService } from "../../../../services/ProductService";

// Custom hook để xóa một branch 
export default function useDeleteProduct() {
    // Sử dụng useQueryClient để thực hiện các thao tác liên quan đến cache
    const queryClient = useQueryClient();
    // Sử dụng useMutation để tạo một hàm deleteBranch và biến isDelete
    const { mutate: deleteProduct, isPending: isDelete } = useMutation({
        mutationFn: productService.delete,
        onSuccess: () => {
            toast.success("Delete product successfully!!");

            // Sau khi tạo tài khoản thành công, đánh dấu truy vấn 'branches' là không hợp lệ để làm mới dữ liệu
            queryClient.invalidateQueries('branches');
        },
        onError: () => {
            toast.error("Delete product failed!!");
        },
    })
    return { deleteProduct, isDelete };
}
