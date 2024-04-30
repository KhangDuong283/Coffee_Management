import { AreaChart, Area } from "recharts"
import useReadBillProduct from "./hooks/useReadBillProduct";
import useReadBill from './../../Order/hooks/useReadBill';
import useReadBranch from './../../Branch/BranchList/hooks/useReadBranch';


export default function LineChart() {

    // Lấy dữ liệu hóa đơn
    const { bills } = useReadBill();
    const bill_data = bills ? bills : [];

    // lấy danh sách các branch_id trong bảng bills
    const { branches } = useReadBranch();
    const branch_data = branches ? branches : [];

    // Lấy dữ liệu chi tiết hóa đơn
    const { billproducts } = useReadBillProduct();
    const billproduct_data = billproducts ? billproducts : [];

    const branchArray = branch_data.map(branch => {
        const billIds = bill_data
            .filter(bill => bill.branch_id === branch.branch_id)
            .map(bill => bill.bill_id);

        const totalBillProductPrice = billIds.reduce((total, billId) => {
            const billProducts = billproduct_data.filter(item => item.bill_id === billId);
            const billProductPrice = billProducts.reduce((totalPrice, product) => totalPrice + product.billproduct_price * product.billproduct_quantity, 0);
            return total + billProductPrice;
        }, 0);

        const totalBillProductCost = billIds.reduce((total, billId) => {
            const billProducts = billproduct_data.filter(item => item.bill_id === billId);
            const billProductCost = billProducts.reduce((totalCost, product) => totalCost + product.billproduct_cost * product.billproduct_quantity, 0);
            return total + billProductCost;
        }, 0);

        return {
            [branch.branch_id]: {
                totalBillProductPrice,
                totalBillProductCost
            }
        };
    });

    console.log(branchArray);


    return (
        <AreaChart width={500} height={400} data={branchArray}>

        </AreaChart>
    )
}
