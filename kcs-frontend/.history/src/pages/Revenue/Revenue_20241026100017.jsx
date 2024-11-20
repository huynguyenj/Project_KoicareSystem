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


const prepareChartData = () => {
  const revenueData = [
    getMonthlyRevenue(8), // August
    getMonthlyRevenue(9), // September
    getMonthlyRevenue(10), // October
    getMonthlyRevenue(11), // November
  ];
  return revenueData;
};

const getMonthlyRevenue = (month) => {
  const filteredOrders = orders.filter(order => new Date(order.date).getMonth() + 1 === month);
  return filteredOrders.reduce((total, order) => total + order.price * order.quantity, 0);
};

// Data for the BarChart
const chartData = prepareChartData();
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
                  series={[
                    {data:chartData}
                  ]}
                  
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
