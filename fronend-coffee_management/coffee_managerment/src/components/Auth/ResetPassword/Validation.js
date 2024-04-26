
export default function Validation(values, admins_data) {
    let error = {}

    // Kiểm tra username
    const usermane = values.admin_username;
    if (!usermane.trim()) {
        error.admin_username = "Username is required"
    }
    else if (usermane.length < 6) {
        error.admin_username = "Username must be at least 6 characters"
    }
    else if (!admins_data.some(admin => admin.admin_username === usermane)) {
        error.admin_username = "Username is not exist"
    }

    // Kiểm tra password
    const current_password = values.current_password;
    if (!current_password) {
        error.current_password = "Password is required"
    }
    else if (!admins_data.some(admin => admin.admin_username === usermane && admin.admin_password === current_password)) {
        error.current_password = "Password is incorrect"
    }

    // Mật khẩu bắt buộc và phải có ít nhất 6 ký tự
    const new_password = values.new_password;
    if (!new_password) {
        error.new_password = "Password is required"
    }
    else if (new_password.length < 6) {
        error.new_password = "Password must be at least 6 characters"
    }

    // Nhập lại mật khẩu bắt buộc và phải khớp với mật khẩu
    const new_password_confirm = values.new_password_confirm;
    if (!new_password_confirm) {
        error.new_password_confirm = "New password is required"
    }
    else if (new_password_confirm !== new_password) {
        error.new_password_confirm = "New password do not match"
    }
    return error;
}
