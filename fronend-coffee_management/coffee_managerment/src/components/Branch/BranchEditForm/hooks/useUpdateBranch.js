import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { branchService } from "../../../../services/BranchService";

// Custom hook để tạo một branch mới
export default function useUpdateBranch() {
    // Sử dụng useQueryClient để thực hiện các thao tác liên quan đến cache
    const queryClient = useQueryClient();
    // Sử dụng useMutation để tạo một hàm updateBranch và biến isUpdating
    const { mutate: updateBranch, isPending: isUpdating } = useMutation({
        mutationFn: ({ branch_id, new_branch }) => branchService.update(branch_id, new_branch),
        onSuccess: () => {
            toast.success("Update branch successfully!!");

            // Sau khi tạo tài khoản thành công, đánh dấu truy vấn 'branches' là không hợp lệ để làm mới dữ liệu
            queryClient.invalidateQueries('branches');
        },
        onError: () => {
            toast.error("Update branch failed!!");
        },
    })
    return { updateBranch, isUpdating };
}
