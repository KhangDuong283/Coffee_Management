import { useQuery } from "@tanstack/react-query";
import { employeeService } from './../../../../services/EmployeeService';



export default function useReadEmployee() {
    const { data: employees, isLoading, error } = useQuery({
        queryKey: ['employees'],
        queryFn: employeeService.read
    });

    return { employees, isLoading, error };
}