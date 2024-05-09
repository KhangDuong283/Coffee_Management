import axios from 'axios';

const BASE_API_URL = "http://nienluan.localhost";

class BillProductService {
    // Hàm tạo một tài khoản admin mới
    async create(newBillProduct) {
        return (await axios.post(`${BASE_API_URL}/billproducts`, newBillProduct)).data;
    }

    // Hàm lấy thông tin tất cả tài khoản admin
    async read() {
        return (await axios.get(`${BASE_API_URL}/billproducts`)).data;
        
    }

}

export const billProductService = new BillProductService();

