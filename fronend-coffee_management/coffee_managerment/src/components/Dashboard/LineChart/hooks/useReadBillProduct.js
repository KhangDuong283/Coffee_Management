import { useQuery } from "@tanstack/react-query";
import { billProductService } from "../../../../services/BillProductService";


export default function useReadBillProduct() {
    const { data: billproducts, isLoading, error } = useQuery({
        queryKey: ['billproducts'],
        queryFn: billProductService.read
    });

    return { billproducts, isLoading, error };
}