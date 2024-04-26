import { useQuery } from "@tanstack/react-query";
import { branchService } from "../../../../services/BranchService";



export default function useReadBranch() {
    const { data: branches, isLoading, error } = useQuery({
        queryKey: ['branches'],
        queryFn: branchService.read
    });

    return { branches, isLoading, error };
}