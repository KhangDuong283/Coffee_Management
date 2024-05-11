import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { productService } from "../../../../services/ProductService";

// Custom hook để xóa một branch 
export default function useUpdateProduct() {
    // Sử dụng useQueryClient để thực hiện các thao tác liên quan đến cache
    const queryClient = useQueryClient();
    // Sử dụng useMutation để tạo một hàm deleteBranch và biến isDelete
    const { mutate: updateProduct, isPending: isUpdate } = useMutation({
        mutationFn: ({ product_id, new_product }) => productService.update(product_id, new_product),
        onSuccess: () => {
            // toast.success("Update product successfully!!");

            // Sau khi tạo tài khoản thành công, đánh dấu truy vấn 'branches' là không hợp lệ để làm mới dữ liệu
            queryClient.invalidateQueries('products');
        },
        onError: () => {
            toast.error("Update product failed!!");
        },
    })
    return { updateProduct, isUpdate };
}
