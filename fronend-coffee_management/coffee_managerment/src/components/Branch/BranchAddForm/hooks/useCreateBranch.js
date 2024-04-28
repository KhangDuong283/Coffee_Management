import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { branchService } from "../../../../services/BranchService";

// Custom hook để tạo một branch mới
export default function useCreateBranch() {
    // Sử dụng useQueryClient để thực hiện các thao tác liên quan đến cache
    const queryClient = useQueryClient();
    // Sử dụng useMutation để tạo một hàm createBranch và biến isCreating
    const { mutate: createBranch, isPending: isCreating } = useMutation({
        mutationFn: branchService.create,
        onSuccess: () => {
            toast.success("Create branch successfully!!");

            // Sau khi tạo tài khoản thành công, đánh dấu truy vấn 'branches' là không hợp lệ để làm mới dữ liệu
            queryClient.invalidateQueries('branches');
        },
        onError: () => {
            toast.error("Create branch failed!!");
        },
    })
    return { createBranch, isCreating };
}
