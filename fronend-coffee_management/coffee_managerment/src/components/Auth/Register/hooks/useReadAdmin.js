import { useQuery } from "@tanstack/react-query";
import { adminService } from "../../../../services/AdminService";


export default function useReadAdmin() {
    const { data: admins, isLoading, error } = useQuery({
        queryKey: ['admins'],
        queryFn: adminService.read
    });

    return { admins, isLoading, error };
}