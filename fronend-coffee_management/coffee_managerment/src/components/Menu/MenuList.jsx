import "./MenuList.css";
import useReadProduct from './../Product/ProductList/hooks/useReadProduct';
import { useEffect, useState } from "react";



export default function MenuList() {

    // Lấy tên branch từ branch_id
    const { products, error } = useReadProduct();

    const choose_product = null;

    const [productData, setProductData] = useState([]);

    useEffect(() => {
        // Lọc ra những sản phẩm có product_active là true
        const updatedProductData = products?.filter(product => product.product_active) || [];
        setProductData(updatedProductData);
    }, [products]);

    // console.log(productData)
    const handleSize = (product, index) => {
        // Tạo một bản sao của productData
        const updatedProductData = [...productData];

        // Tìm sản phẩm cần cập nhật
        const productToUpdate = updatedProductData.find(p => p.product_id === product.product_id);


        // Kiểm tra nếu productToUpdate tồn tại
        if (productToUpdate) {
            // Cập nhật size của sản phẩm
            productToUpdate.product_current_size = index;

            // Cập nhật state
            setProductData(updatedProductData);             
        }

    }




    return (
        <div className="menu__content row bg-white" style={{ height: "95vh" }}>
            {productData?.map((product) => (
                <div className="menu__item col-2" key={product.product_id}>
                    <div className="card" style={{ width: '100%' }}>
                        <img style={{ height: "20vh", objectFit: "cover" }}
                            src={product.product_img}
                            className="card-img-top" alt={product.product_name} />
                        <div className="card-body mx-1 p-0">
                            <p className="card-text text-center fw-bold mb-0 name">{product.product_name}</p>
                            <p className="text-center p-0 m-0 fst-italic price">
                                {product.product_current_size == 0 ? Number(product.product_price_s).toLocaleString() : null}
                                {product.product_current_size == 1 ? Number(product.product_price_m).toLocaleString() : null}
                                {product.product_current_size == 2 ? Number(product.product_price_l).toLocaleString() : null}
                                đ
                            </p>
                            <div className="">
                                <span className="size__group">
                                    <small className={product.product_current_size == 0 ? "active" : ""} onClick={() => { handleSize(product, 0) }}>S</small>
                                    <small className={product.product_current_size == 1 ? "active" : ""} onClick={() => { handleSize(product, 1) }}>M</small>
                                    <small className={product.product_current_size == 2 ? "active" : ""} onClick={() => { handleSize(product, 2) }}>L</small>
                                </span>
                                <div className="text-center">
                                    <button className="btn btn-outline-success add_button my-2">Add</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
