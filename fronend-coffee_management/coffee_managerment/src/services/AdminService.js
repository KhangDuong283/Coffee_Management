import axios from 'axios';

const BASE_API_URL = "http://nienluan.localhost";

class AdminService {
    // Hàm tạo một tài khoản admin mới
    async create(newAdmin) {
        return (await axios.post(`${BASE_API_URL}/admins`, newAdmin)).data;
    }

    // Hàm lấy thông tin tất cả tài khoản admin
    async read() {
        return (await axios.get(`${BASE_API_URL}/admins`)).data;
    }

    // Hàm cập nhật thông tin một tài khoản admin
    async update(admin_id, newAdmin) {
        return (await axios.put(`${BASE_API_URL}/admins/${admin_id}`, newAdmin)).data;
    }

}

export const adminService = new AdminService();

