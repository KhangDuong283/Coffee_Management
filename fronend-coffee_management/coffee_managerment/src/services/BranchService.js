import axios from 'axios';

const BASE_API_URL = "http://nienluan.localhost";

class BranchService {
    // Hàm tạo một tài khoản admin mới
    async create(newBranch) {
        return (await axios.post(`${BASE_API_URL}/branches`, newBranch)).data;
    }

    // Hàm lấy thông tin tất cả tài khoản admin
    async read() {
        return (await axios.get(`${BASE_API_URL}/branches`)).data;
    }

    // Hàm cập nhật thông tin một tài khoản admin
    async update(branch_id, newBranch) {
        return (await axios.put(`${BASE_API_URL}/branches/${branch_id}`, newBranch)).data;
    }

}

export const branchService = new BranchService();

