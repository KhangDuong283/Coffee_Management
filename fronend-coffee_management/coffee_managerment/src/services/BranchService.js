import axios from 'axios';

const BASE_API_URL = "http://nienluan.localhost";

class BranchService {
    // Hàm tạo một tài khoản admin mới
    async create(newBranch) {
        const status = (await axios.post(`${BASE_API_URL}/branches`, newBranch)).data;
        console.log(status);
    }

    // Hàm lấy thông tin tất cả tài khoản admin
    async read() {
        return (await axios.get(`${BASE_API_URL}/branches`)).data;
    }

    // Hàm cập nhật thông tin một tài khoản admin
    async update(branch_id, newBranch) {
        const status = (await axios.put(`${BASE_API_URL}/branches/${branch_id}`, newBranch)).data;
        console.log(status);
    }

}

export const branchService = new BranchService();

