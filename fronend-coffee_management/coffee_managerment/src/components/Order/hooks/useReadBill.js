import { useQuery } from "@tanstack/react-query";
import { billService } from "../../../services/BillService";


export default function useReadBill() {
    const { data: bills, isLoading, error } = useQuery({
        queryKey: ['bills'],
        queryFn: billService.read
    });

    return { bills, isLoading, error };
}