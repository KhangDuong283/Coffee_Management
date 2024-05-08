import axios from 'axios';

const BASE_API_URL = "http://nienluan.localhost";

class ProductService {
    // Hàm lấy thông tin tất cả tài khoản admin
    async read() {
        return (await axios.get(`${BASE_API_URL}/products`)).data;
    }

    async create(newProduct) {
        const status = (await axios.post(`${BASE_API_URL}/products`, newProduct)).data;
        console.log(status);

    }

    async update(productId, updatedProduct) {

        const status = (await axios.post(`${BASE_API_URL}/products/${productId}`, updatedProduct)).data;
        console.log(status);
    }
    async delete(productId) {
        return (await axios.delete(`${BASE_API_URL}/products/${productId}`)).data;
    }

    async count() {
        return (await axios.get(`${BASE_API_URL}/products/count`)).data;
    }

}

export const productService = new ProductService();