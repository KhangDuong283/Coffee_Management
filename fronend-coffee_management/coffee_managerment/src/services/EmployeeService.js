import axios from 'axios';

const BASE_API_URL = "http://nienluan.localhost";

class EmployeeService {
    // Hàm tạo một tài khoản admin mới
    async create(newEmployee) {
        const status = (await axios.post(`${BASE_API_URL}/employees`, newEmployee)).data;
        // console.log(status);
    }

    // Hàm lấy thông tin tất cả tài khoản admin
    async read() {
        return (await axios.get(`${BASE_API_URL}/employees`)).data;
    }

    // Hàm cập nhật thông tin một tài khoản admin
    async update(employee_id, newEmployee) {
        const status = (await axios.put(`${BASE_API_URL}/employees/${employee_id}`, newEmployee)).data;
        console.log(status);
    }

    // Xóa employee
    async delete(employee_id) {
        const status = (await axios.delete(`${BASE_API_URL}/employees/${employee_id}`)).data;
    }

}

export const employeeService = new EmployeeService();

