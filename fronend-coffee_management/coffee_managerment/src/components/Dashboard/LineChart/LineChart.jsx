import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from "recharts"
import useReadBillProduct from "./hooks/useReadBillProduct";
import useReadBill from './../../Order/hooks/useReadBill';
import useReadBranch from './../../Branch/BranchList/hooks/useReadBranch';

import moment from 'moment';
import { useState } from 'react';
import { set } from "react-hook-form";

export default function LineChartComponent() {

    // Lấy dữ liệu hóa đơn
    const { bills } = useReadBill();
    const bill_data = bills ? bills : [];

    // lấy danh sách các branch_id trong bảng bills
    const { branches } = useReadBranch();
    const branch_data = branches ? branches : [];

    // Lấy dữ liệu chi tiết hóa đơn
    const { billproducts } = useReadBillProduct();
    const billproduct_data = billproducts ? billproducts : [];

    // Chọn số ngày hiển thị chart
    const [days, setDays] = useState(7);
    const handleDays = (event) => {
        setDays(event.target.value);
    }

    const branchArray = branch_data.map(branch => {
        const billIds = bill_data
            .filter(bill => bill.branch_id === branch.branch_id
                && (moment().diff(moment(bill.bill_datetime), 'days') <= days))
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
            branch_id: branch.branch_name,
            totalBillProductPrice,
            totalBillProductCost
        };
    });

    //console.log(branchArray);


    return (
        <div className="w-100" style={{ height: "200px" }}>
            <select name="" className="mb-3" onChange={handleDays}>
                <option value="7">7 days</option>
                <option value="1">1 days</option>
                <option value="3">3 days</option>
                <option value="14">14 days</option>
                <option value="30">30 days</option>
            </select>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart width={500} height={400} data={branchArray}>
                    <YAxis />
                    <XAxis dataKey="branch_id" />
                    <CartesianGrid strokeDasharray="5 5" />
                    <legend />
                    <Tooltip />

                    <Line type="monotone" dataKey="totalBillProductPrice" name="Revenue" stroke="#8884d8" fill="#3bc963" stackId="1" />
                    <Line type="monotone" dataKey="totalBillProductCost" name="Cost" stroke="#82ca9d" fill="#1d92f1" stackId="1" />
                </LineChart>
            </ResponsiveContainer >
        </div>
    )
}
