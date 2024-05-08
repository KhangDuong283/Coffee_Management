import "./ProductList.css"
import { useState, useEffect } from 'react';
import moment from "moment";
import { useNavigate } from "react-router-dom";
import useReadProduct from "./hooks/useReadProduct";
import useDeleteProduct from "./hooks/useDeleteProduct";
import useUpdateProduct from "./hooks/useUpdateProduct";
import { toast } from "react-toastify";

export default function ProductList() {
    // *******************************Chọn dòng*********************************************
    // Khai báo state clickCount để lưu trữ số lần click vào row
    const [clickCount, setClickCount] = useState(0);
    // Khai báo state selectedRow để lưu trữ index của row được chọn
    const [selectedRow, setSelectedRow] = useState(null);
    // Tạo hiệu ứng select row khi click vào row
    const handleClick = (rowIndex) => {
        // Set selectedRow = rowIndex của row được click
        setSelectedRow(rowIndex);
        // Tăng clickCount lên 1 mỗi lần click vào row
        setClickCount((click) => click + 1);
    };

    useEffect(() => {
        // sau mỗi lần click giữa các thẻ <tr> mà chưa đủ 250ms thì cho clickCount = 0 để không mở modal
        // Chỉ khi click nhanh hơn 250ms thì mở modal
        const timer = setTimeout(() => {
            setClickCount(0);
        }, 250);

        // Nếu clickCount = 2 thì set lại clickCount = 0 
        if (clickCount === 2) {
            setClickCount(0);
        }

        // trả timer = 0
        return () => clearTimeout(timer);
    }, [clickCount]);

    // *************************************************************************************

    // Lấy tên branch từ branch_id
    const { products, error } = useReadProduct();
    const product_data = products ? products : null;


    const navigate = useNavigate();

    // Chuyển hướng đến trang sửa product và truyền product cần sửa
    const handleEdit = (product) => {
        navigate('/management/product/edit', { state: { product } });
    }

    // Chuyển hướng đến trang thêm product
    const handleAdd = () => {
        navigate('/management/product/add');
    }

    // Xóa employee
    const { deleteProduct } = useDeleteProduct();
    const handleDelete = (product_id) => {
        deleteProduct(product_id)
    }

    const { updateProduct, isUpdate } = useUpdateProduct();

    const handleAddMenu = (product) => {
        console.log(product.product_active);
        const formData = new FormData();
        const active = product.product_active === 0 ? 1 : 0;
        formData.append("product_name", product.product_name);
        formData.append("product_active", active);
        formData.append("product_price_s", product.product_price_s);
        formData.append("product_cost_s", product.product_cost_s);
        formData.append("product_price_m", product.product_price_m);
        formData.append("product_cost_m", product.product_cost_m);
        formData.append("product_price_l", product.product_price_l);
        formData.append("product_cost_l", product.product_cost_l);
        formData.append("product_img", product.product_img[0]);
        updateProduct({ product_id: product.product_id, new_product: formData });
        if (product.product_active === 0) {
            toast.success("Add to menu successfully!!");
        } else {
            toast.success("Remove from menu successfully!!");
        }
    }




    return (
        <table className="product__list">
            <thead>
                <tr>
                    <th>Product id</th>
                    <th>Product image</th>
                    <th>Product name</th>
                    <th>Set on menu</th>
                    <th>
                        <button className="btn btn-info" onClick={handleAdd}>
                            Add product
                        </button>
                    </th>
                </tr>
            </thead>
            <tbody>
                {!error && !product_data ?
                    (<tr><td colSpan="5">There are no products right now</td></tr>)
                    :
                    (product_data?.map((product, index) => (
                        <tr key={index}
                            // Hiển thị row được chọn
                            onClick={() => handleClick(index)}
                            className={index === selectedRow ? 'selected' : ''}
                            // Nếu clickCount = 1 thì mở modal
                            data-bs-toggle={clickCount === 1 ? "modal" : null} data-bs-target={"#productListModal" + product.product_id}
                        >
                            <td className="name" >{product.product_id}</td>
                            <td className="image" style={{ width: "18vw" }}>
                                <img
                                    src={product.product_img == "" ?
                                        "http://nienluan.localhost/uploads/productRoot.png"
                                        : "http://nienluan.localhost/uploads/" + product.product_img}
                                    alt="product_image"
                                    style={{ width: "50px", height: "50px", borderRadius: "50%"}}
                                />
                            </td>

                            <td className="name">{product.product_name}</td>
                            <td className="more">
                                {product.product_active === 1 ?
                                    (<i onClick={() => { handleAddMenu(product) }} className="border px-3 py-1 border-success fa fa-check text-success rounded"></i>) :
                                    (<button onClick={() => { handleAddMenu(product) }} className="btn btn-outline-info">Add menu</button>)
                                }
                            </td>
                            <td className="more dropstart" >
                                <p data-bs-toggle="dropdown" aria-expanded="false" className="mb-0">
                                    <i className="ri-more-fill" />
                                </p>
                                <ul className="dropdown-menu text-center">
                                    <li><button className="w-100 btn edit" onClick={() => { handleEdit(product) }}>Edit</button></li>
                                    <li><button className="w-100 btn delete" onClick={() => { handleDelete(product.product_id) }}>Delete</button></li>
                                </ul>
                            </td>


                            {/* Modal */}
                            <div className="modal fade branch__modal" id={"productListModal" + product.product_id} tabIndex={- 1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                    <div className="modal-content">
                                        <form>
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-4 ms-3" id="exampleModalLabel">{product.product_id}</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                            </div>
                                            <div className="modal-body">
                                                <div className="table table-hover">
                                                    <tbody>
                                                        <tr>
                                                            <th>Name</th>
                                                            <td>{product.product_name}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Set on menu</th>
                                                            <td className="align-middle">{product.product_active ? "Yes" : "No"}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Size S</th>
                                                            <td>Price: {product.product_price_s} | Cost: {product.product_cost_s}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Size M</th>
                                                            <td>Price: {product.product_price_m} | Cost: {product.product_cost_m}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Size L</th>
                                                            <td>Price: {product.product_price_l} | Cost: {product.product_cost_l}</td>
                                                        </tr>
                                                    </tbody>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </tr>
                    )))
                }
            </tbody >


        </table >
    );
}