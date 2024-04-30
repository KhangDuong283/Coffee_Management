import useReadBill from "../../Order/hooks/useReadBill";
import useReadBillProduct from "../LineChart/hooks/useReadBillProduct";
import "./QuickAccess.css";

export default function QuickAccess() {

    // đếm số lượng bill
    const { bills } = useReadBill();
    const bill_data = bills ? bills : [];
    const totalBill = bill_data.length;

    // đếm số lượng sản phẩm bán ra
    const { billproducts } = useReadBillProduct();
    // tổng các sản phẩm bán ra
    const totalBillProduct = billproducts?.reduce((total, product) => total + product.billproduct_quantity, 0);

    // tổng chi phí sản phẩm đã bán
    const totalBillProductCost = billproducts?.reduce((total, product) => total + product.billproduct_cost * product.billproduct_quantity, 0);

    // Tổng doanh thu
    const totalBillProductPrice = billproducts?.reduce((total, product) => total + product.billproduct_price * product.billproduct_quantity, 0);

    // tổng lợi nhuận
    const totalProfit = totalBillProductPrice - totalBillProductCost;

    return (
        <div className="quick-access">
            <div className="item">
                <i className="fa fa-shopping-cart"></i>
                <h5>Number of orders</h5>
                <p>{totalBill} order</p>
            </div>
            <div className="item">
                <i className="fa fa-file-invoice-dollar"></i>
                <h5>Quantity products sold</h5>
                <p>{totalBillProduct} product</p>
            </div>
            <div className="item">
                <i className="fa fa-money-check-alt"></i>
                <h5>Revenue</h5>
                <p>{Number(totalBillProductCost).toLocaleString()} VNĐ </p>
            </div>
            <div className="item">
                <i className="fa fa-donate"></i>
                <h5>Profit</h5>
                <p>{Number(totalProfit).toLocaleString()} VNĐ </p>
            </div>
        </div>
    )
}
