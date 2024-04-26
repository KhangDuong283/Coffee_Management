
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
    const password = values.admin_password;
    if (!password) {
        error.admin_password = "Password is required"
    }
    else if (!admins_data.some(admin => admin.admin_username === usermane && admin.admin_password === password)) {
        error.admin_password = "Password is incorrect"
    }

    return error;
}
