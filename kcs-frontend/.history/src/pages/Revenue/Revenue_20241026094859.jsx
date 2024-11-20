import React, { useEffect, useState } from "react";
import "./Revenue.css";
import ShopD from "../../components/Drawers/Shop";
import FooterEnd from "../../components/Footer/FooterEnd";
import { getAllOrders } from "../../api/shop";
import { BarChart, } from "@mui/icons-material";
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
                  <img src="BG.jpg" alt="Revenue Chart" className="revenue-chart" />
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
