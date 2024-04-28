import axios from 'axios';

const BASE_API_URL = "http://nienluan.localhost";

class BranchService {
    // Hàm tạo mới
    async create(newBranch) {
        const status = (await axios.post(`${BASE_API_URL}/branches`, newBranch)).data;
        // console.log(status);
    }

    // Hàm lấy thông tin tất cả 
    async read() {
        const status = (await axios.get(`${BASE_API_URL}/branches`)).data;
        return (await axios.get(`${BASE_API_URL}/branches`)).data;
    }

    // Hàm cập nhật thông tin
    async update(branch_id, newBranch) {
        const status = (await axios.put(`${BASE_API_URL}/branches/${branch_id}`, newBranch)).data;
        // console.log(status);
    }

    // Hàm xóa một branch
    async delete(branch_id) {
        // console.log(`${BASE_API_URL}/branches/${branch_id}`);
        const status = (await axios.delete(`${BASE_API_URL}/branches/${branch_id}`)).data;
        // console.log(status);
    }
}

export const branchService = new BranchService();

