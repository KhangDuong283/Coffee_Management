import axios from 'axios';

const BASE_API_URL = "http://nienluan.localhost";

class BillService {
    // Hàm tạo một tài khoản admin mới
    async create(newBill) {
        return (await axios.post(`${BASE_API_URL}/bills`, newBill)).data;
    }

    // Hàm lấy thông tin tất cả tài khoản admin
    async read() {
        return (await axios.get(`${BASE_API_URL}/bills`)).data;
    }

    // Hàm cập nhật thông tin một tài khoản admin
    async update(bill_id, newBill) {
        return (await axios.put(`${BASE_API_URL}/bills/${bill_id}`, newBill)).data;
    }

}

export const billService = new BillService();

