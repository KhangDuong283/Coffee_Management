
export default function ErrorValidate(errors, field) {
    return errors[field] && <small className="error text-danger">{errors[field]}</small>;
}