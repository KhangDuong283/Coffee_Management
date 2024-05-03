import { useSelector } from "react-redux";
import useReadBill from "../../Order/hooks/useReadBill";
import useReadBillProduct from "../LineChart/hooks/useReadBillProduct";
import "./QuickAccess.css";


export default function QuickAccess() {
    // Lấy branch_id từ store chọn từ header
    const branch_id = useSelector(state => state.branch);

    // lấy dữ liệu hóa đơn
    const { bills } = useReadBill();
    var bill_data = bills ? bills : [];

    if (branch_id) {
        // lấy các bill có branch_id trùng với branch_id đã chọn
        bill_data = bills ? bills?.filter(bill => bill.branch_id === branch_id) : [];
    }

    // lấy mảng gồm các bill_id từ bill_data
    const bill_id = bill_data?.map(bill => bill.bill_id);

    // đếm số lượng sản phẩm bán ra
    const { billproducts } = useReadBillProduct();
    // Chỉ lấy các billproduct có bill_id trùng với bill_id đã lấy ở trên
    // include kiểm tra xem mảng có thõa đk không (T/F)
    // Nếu bill_id của bảng chi tiết hóa đơn có trong mảng bill_id thì lấy ra
    const billproduct_data = billproducts ? billproducts?.filter(product => bill_id.includes(product.bill_id)) : [];
    // const billproduct_data = billproducts ? billproducts : [];

    // tổng các sản phẩm bán ra
    const totalBillProduct = billproduct_data.reduce((total, product) => total + product.billproduct_quantity, 0);

    // tổng chi phí sản phẩm đã bán
    const totalBillProductCost = billproduct_data.reduce((total, product) => total + product.billproduct_cost * product.billproduct_quantity, 0);

    // Tổng doanh thu
    const totalBillProductPrice = billproduct_data.reduce((total, product) => total + product.billproduct_price * product.billproduct_quantity, 0);

    // tổng lợi nhuận
    const totalProfit = totalBillProductPrice - totalBillProductCost;

    // Tính tổng số bill
    const totalBill = bill_data.length;


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
