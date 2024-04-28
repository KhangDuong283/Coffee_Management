import { useQuery } from "@tanstack/react-query";
import { productService } from './../../../../services/ProductService';



export default function useReadProduct() {
    const { data: products, isLoading, error } = useQuery({
        queryKey: ['products'],
        queryFn: productService.read
    });

    return { products, isLoading, error };
}