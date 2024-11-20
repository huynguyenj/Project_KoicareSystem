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

const year = ()=>{
  const year = orders.map((y)=>new Date(y.date).)
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

      {[orders.map((year)=>new Date(year.date).getFullYear()).map((title, index) => (
        <div key={index} className="revenue-section">
          <div className="revenue-header" onClick={() => toggleExpand(index)}>
            <span>{title}</span>
            <span>{isExpanded[index] ? "▲" : "▼"}</span>
          </div>
          {isExpanded[index] && (
            <div className="revenue-content">
              {orders.length > 0 ? (
                 <div className="charts-container">
                 <BarChart
                  series={[
                    {data:chartData}
                  ]}
                  height={290}
                  xAxis={[{ data: ['Tháng 1','Tháng 2','Tháng3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11'], scaleType: 'band' }]} // Month labels
                  margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                 >
                  
                 </BarChart>
               </div>
              ) : (
                <p>Chưa có dữ liệu để phân tích cho tháng này.</p>
              )}
            </div>
          )}
        </div>
      ))]}
    </div>
  );
};

export default Revenue;
