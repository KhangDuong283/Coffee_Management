
export default function Validation(values) {
    let error = {}

    if (!values.admin__username.trim()) {
        error.admin__username = "Username is required"
    }
    else if (values.admin__username.length < 6) {
        error.admin__username = "Username must be at least 6 characters"
    }

    if (!values.admin__password) {
        error.admin__password = "Password is required"
    }
    else if (values.admin__password.length < 6) {
        error.admin__password = "Password must be at least 6 characters"
    }

    return error;
}
