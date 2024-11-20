import React, { useEffect, useState } from "react";
import "./Revenue.css";
import ShopD from "../../components/Drawers/Shop";
import FooterEnd from "../../components/Footer/FooterEnd";
import { getAllOrders } from "../../api/shop";
import { BarChart} from "@mui/x-charts/BarChart";
const Revenue = () => {
  const [isExpanded, setIsExpanded] = useState([false, false, false]);
  const [orders, setOrders] = useState([]);
  const toggleExpand = (index) => {
    const updatedState = [...isExpanded];
    updatedState[index] = !updatedState[index];
    setIsExpanded(updatedState);
  };

  useEffect(()=>{
    getOrders();
  },[])

  const getOrders = async () =>{
    try {
      const res = await getAllOrders();
      setOrders(res.result)
    } catch (error) {
      console.log(error)
    }
}


  // Process data for each month
  const getMonthlyRevenue = (month) => {
    const filteredOrders = orders.filter(order => new Date(order.date).getMonth() + 1 === month);
    return filteredOrders.reduce((total, order) => total + order.price * order.quantity, 0);
  };

  // Monthly revenue data for each month (e.g., Aug to Nov)
  const monthlyData = [
    { month: "August", revenue: getMonthlyRevenue(8) },
    { month: "September", revenue: getMonthlyRevenue(9) },
    { month: "October", revenue: getMonthlyRevenue(10) },
    { month: "November", revenue: getMonthlyRevenue(11) },
  ];
  return (
    <div className="Revenue-container">

      {["Thống kê doanh thu tháng 8", "Thống kê doanh thu tháng 9", "Thống kê doanh thu tháng 10", "Thống kê doanh thu tháng 11"].map((title, index) => (
        <div key={index} className="revenue-section">
          <div className="revenue-header" onClick={() => toggleExpand(index)}>
            <span>{title}</span>
            <span>{isExpanded[index] ? "▲" : "▼"}</span>
          </div>
          {isExpanded[index] && (
            <div className="revenue-content">
              {index === 2 ? (
                 <div className="charts-container">
                 <BarChart
                   width={500}
                   height={300}
                   data={monthlyData}
                   xAxis={{ dataKey: "month" }}
                 >
                  
                 </BarChart>
               </div>
              ) : (
                <p>Chưa có dữ liệu để phân tích cho tháng này.</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Revenue;
