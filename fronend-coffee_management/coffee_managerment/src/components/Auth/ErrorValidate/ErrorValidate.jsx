
export default function ErrorValidate(errors, field) {
    // Nếu có lỗi thì hiển thị thông báo lỗi ra màn hình ngược lại thì không hiển thị gì cả 
    return errors[field] && <small className="error text-danger fst-italic" style={{fontSize: ".85rem"}}>{errors[field]}</small>;
}