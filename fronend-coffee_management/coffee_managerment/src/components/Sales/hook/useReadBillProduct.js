import { useQuery } from "@tanstack/react-query";
import { billProductService } from "../../../services/BillProductService";



export default function useReadBillProduct() {
    const { data: billProducts, isLoading, error } = useQuery({
        queryKey: ['billProducts'],
        queryFn: billProductService.read
    });

    return { billProducts, isLoading, error };
}