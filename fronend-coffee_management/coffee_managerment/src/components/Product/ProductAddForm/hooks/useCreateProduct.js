import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { productService } from "../../../../services/ProductService";

// Custom hook để tạo một branch mới
export default function useCreateProduct() {
    // Sử dụng useQueryClient để thực hiện các thao tác liên quan đến cache
    const queryClient = useQueryClient();
    // Sử dụng useMutation để tạo một hàm createBranch và biến isCreating
    const { mutate: createProduct, isPending: isCreating } = useMutation({
        mutationFn: productService.create,
        onSuccess: () => {
            toast.success("Create product successfully!!");

            // Sau khi tạo tài khoản thành công, đánh dấu truy vấn 'branches' là không hợp lệ để làm mới dữ liệu
            queryClient.invalidateQueries('products');
        },
        onError: () => {
            toast.error("Create product failed!!");
        },
    })
    return { createProduct, isCreating };
}
