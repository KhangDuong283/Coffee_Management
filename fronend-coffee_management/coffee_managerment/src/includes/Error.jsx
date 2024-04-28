import { useNavigate, useRouteError } from "react-router-dom";


export default function Error() {
    const err = useRouteError();
    const navigate = useNavigate();
    return (
        <div>
            <h1>Something went wrong</h1>
            <p>
                {err.status} {err.statusText} {err.data}
            </p>
            {/* Trở về trang trước đó */}
            <button onClick={() => navigate(-1)}>Go back to previous page</button>
        </div>
    )
} 