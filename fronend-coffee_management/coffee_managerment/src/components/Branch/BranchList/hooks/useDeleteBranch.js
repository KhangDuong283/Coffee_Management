import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { branchService } from "../../../../services/BranchService";

// Custom hook để xóa một branch 
export default function useDeleteBranch() {
    // Sử dụng useQueryClient để thực hiện các thao tác liên quan đến cache
    const queryClient = useQueryClient();
    // Sử dụng useMutation để tạo một hàm deleteBranch và biến isDelete
    const { mutate: deleteBranch, isPending: isDelete } = useMutation({
        mutationFn: branchService.delete,
        onSuccess: () => {
            toast.success("Delete branch successfully!!");

            // Sau khi tạo tài khoản thành công, đánh dấu truy vấn 'branches' là không hợp lệ để làm mới dữ liệu
            queryClient.invalidateQueries('branches');
        },
        onError: () => {
            toast.error("Delete branch failed!!");
        },
    })
    return { deleteBranch, isDelete };
}
