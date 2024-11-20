import React, { useState } from "react";
import "./Revenue.css";
import ShopD from "../../components/Drawers/Shop";
import FooterEnd from "../../components/Footer/FooterEnd";

const Revenue = () => {
  const [isExpanded, setIsExpanded] = useState([false, false, false]);

  const toggleExpand = (index) => {
    const updatedState = [...isExpanded];
    updatedState[index] = !updatedState[index];
    setIsExpanded(updatedState);
  };

  return (
    <div className="Revenue-container">
      
      <div className="filter-bar">
        <label>Từ</label>
        <input type="date" />
        <label>Đến</label>
        <input type="date" />
      </div>
      <div>
        <p2 className="title-of-page">Doanh thu theo tháng</p2>
      </div>

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
      <FooterEnd />
    </div>
  );
};

export default Revenue;