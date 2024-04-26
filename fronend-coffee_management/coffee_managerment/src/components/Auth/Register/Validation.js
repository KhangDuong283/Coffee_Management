

export default function Validation(values, admins_data) {

    let error = {}

    // Tên đăng nhập bắt buộc và phải có ít nhất 6 ký tự và không chứa ký tự đặc biệt
    // Tên đăng nhập phải chưa được sử dụng trong hệ thống
    const username = values.admin_username;
    if (!username.trim()) {
        error.admin_username = "Username is required"
    }
    else if (username.length < 6) {
        error.admin_username = "Username must be at least 6 characters"
    }
    else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        error.admin_username = "Username must not contain special characters";
    }
    // Kiểm tra ít nhất một phần tử trong mảng admins_data có trùng với username hay không
    // Nếu có 1 phần tử trùng thì trả về true
    // Nếu không có phần tử nào trùng thì trả về false
    else if (admins_data.some(admin => admin.admin_username === username)) {
        error.admin_username = "Username is already taken"
    }


    // Mật khẩu bắt buộc và phải có ít nhất 6 ký tự
    const password = values.admin_password;
    if (!password) {
        error.admin_password = "Password is required"
    }
    else if (password.length < 6) {
        error.admin_password = "Password must be at least 6 characters"
    }

    // Nhập lại mật khẩu bắt buộc và phải khớp với mật khẩu
    const password_confirm = values.admin_password_confirm;
    if (!password_confirm) {
        error.admin_password_confirm = "Password is required"
    }
    else if (password_confirm !== password) {
        error.admin_password_confirm = "Password do not match"
    }

    return error;
}
