
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useUpdateProduct from "../ProductList/hooks/useUpdateProduct";
export default function ProductEditForm() {
    // navigate 
    const navigate = useNavigate();
    const handleCancel = () => {
        navigate("/management/product");
    }

    // form
    const form = useForm({
        defaultValues: {
            product_name: "",
            product_active: 0,
            product_price_s: "",
            product_cost_s: "",
            product_price_m: "",
            product_cost_m: "",
            product_price_l: "",
            product_cost_l: "",
        }
    });
    const { register, handleSubmit, formState, setValue, reset, watch } = form;
    const { errors } = formState;

    // Lấy employee từ trang trước 
    const location = useLocation();
    const product = location.state.product;
    const product_id = product.product_id;

    // Set giá trị mặc định cho form từ employee được truyền xuống qua location
    useEffect(() => {
        setValue("product_name", product.product_name);
        setValue("product_active", product.product_active);
        setValue("product_price_s", product.product_price_s);
        setValue("product_cost_s", product.product_cost_s);
        setValue("product_price_m", product.product_price_m);
        setValue("product_cost_m", product.product_cost_m);
        setValue("product_price_l", product.product_price_l);
        setValue("product_cost_l", product.product_cost_l);
    }, [product, setValue]);


    // Gọi hook useCreateEmployee để lấy ra hàm createEmployee và biến trạng thái isCreating
    const { updateProduct, isUpdating } = useUpdateProduct();

    // Hàm xử lý sự kiện khi người dùng ấn nút submit
    const formSubmit = (data) => {
        updateProduct({ product_id: product_id, new_product: data });
        navigate("/management/product");
    }

    const textBtn = isUpdating ? "Updating..." : "Update";

    const profitS = watch("product_price_s") - watch("product_cost_s");
    const profitM = watch("product_price_m") - watch("product_cost_m");
    const profitL = watch("product_price_l") - watch("product_cost_l");

    return (
        <div className="edit__product">
            <form onSubmit={handleSubmit(formSubmit)}>
                <div className="row mb-3">
                    {/* Name */}
                    <div className="col-4">
                        <label htmlFor="product_name" className="form-label">Product name</label>
                        <input {...register("product_name", {
                            required: {
                                value: true,
                                message: "Product name is required"
                            }
                        })} autoFocus type="text" id="product_name" name="product_name" className="form-control" />
                        <small className="text-danger fst-italic">{errors.product_name?.message}</small>
                    </div>

                    {/* Active on menu */}
                    <div className="col-2">
                        <label htmlFor="product_active" className="form-label">Set on menu</label>
                        <select {...register("product_active")} id="product_active" name="product_active" className="form-control">
                            <option value="0">Select status</option>
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </select>
                    </div>
                </div>

                <div className="row mb-3">
                    {/* Price S */}
                    <div className="col-2">
                        <label htmlFor="product_price_s" className="form-label">Price S</label>
                        <input {...register("product_price_s", {
                            // required: {
                            //     value: true,
                            //     message: "Price S is required"
                            // }
                        })} type="number" id="product_price_s" name="product_price_s" className="form-control" />
                        <small className="text-danger fst-italic">{errors.product_price_s?.message}</small>
                    </div>

                    {/* Cost S */}
                    <div className="col-2">
                        <label htmlFor="product_cost_s" className="form-label">Cost S</label>
                        <input {...register("product_cost_s", {
                            // required: {
                            //     value: true,
                            //     message: "Cost S is required"
                            // }
                        })} type="number" id="product_cost_s" name="product_cost_s" className="form-control" />
                        <small className="text-danger fst-italic">{errors.product_cost_s?.message}</small>
                    </div>

                    <div className="col-2">
                        <label className="form-label">Conjectured profit S</label>
                        <input type="number" disabled className="form-control" value={profitS.toLocaleString()} />
                    </div>
                </div >

                <div className="row mb-3">
                    {/* Price M */}
                    <div className="col-2">
                        <label htmlFor="product_price_m" className="form-label">Price M</label>
                        <input {...register("product_price_m", {
                            // required: {
                            //     value: true,
                            //     message: "Price M is required"
                            // }
                        })} type="number" id="product_price_m" name="product_price_m" className="form-control" />
                        <small className="text-danger fst-italic">{errors.product_price_m?.message}</small>
                    </div>

                    {/* Cost M */}
                    <div className="col-2">
                        <label htmlFor="product_cost_m" className="form-label">Cost M</label>
                        <input {...register("product_cost_m", {
                            // required: {
                            //     value: true,
                            //     message: "Cost M is required"
                            // }
                        })} type="number" id="product_cost_m" name="product_cost_m" className="form-control" />
                        <small className="text-danger fst-italic">{errors.product_cost_m?.message}</small>
                    </div>

                    <div className="col-2">
                        <label className="form-label">Conjectured profit M</label>
                        <input type="number" disabled className="form-control" value={profitM.toLocaleString()} />
                    </div>
                </div>

                <div className="row mb-3">

                    {/* Price L */}
                    <div className="col-2">
                        <label htmlFor="product_price_l" className="form-label">Price L</label>
                        <input {...register("product_price_l", {
                            // required: {
                            //     value: true,
                            //     message: "Price L is required"
                            // }
                        })} type="number" id="product_price_l" name="product_price_l" className="form-control" />
                        <small className="text-danger fst-italic">{errors.product_price_l?.message}</small>
                    </div>

                    {/* Cost L */}
                    <div className="col-2">
                        <label htmlFor="product_cost_l" className="form-label">Cost L</label>
                        <input {...register("product_cost_l", {
                            // required: {
                            //     value: true,
                            //     message: "Cost L is required"
                            // }
                        })} type="number" id="product_cost_l" name="product_cost_l" className="form-control" />
                        <small className="text-danger fst-italic">{errors.product_cost_l?.message}</small>
                    </div>

                    <div className="col-2">
                        <label className="form-label">Conjectured profit L</label>
                        <input type="number" disabled className="form-control" value={profitL.toLocaleString()} />
                    </div>
                </div>

                <button onClick={handleCancel} type="button" className="btn btn-danger me-3 mt-4">Cancel</button>
                <button type="submit" className="btn btn-success">{textBtn}</button>
            </form >
        </div >
    )
}