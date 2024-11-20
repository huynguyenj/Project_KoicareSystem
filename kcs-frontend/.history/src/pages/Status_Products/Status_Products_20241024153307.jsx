import React, { useState } from "react";
import "./Status_Products.css";
import ShopD from "../../components/Drawers/Shop";
import FooterEnd from "../../components/Footer/FooterEnd";

const Status_Products = () => {
  // State to manage whether each section is expanded or collapsed
  const [isExpanded, setIsExpanded] = useState([false, false, false]);

  // Function to toggle the expansion of each section
  const toggleExpand = (index) => {
    const updatedState = [...isExpanded];
    updatedState[index] = !updatedState[index];
    setIsExpanded(updatedState);
  };

  return (
    <div className="Status_Products-container">
      <ShopD />
      <div className="filter-bar">
        <label>Từ</label>
        <input type="date" />
        <label>Đến</label>
        <input type="date" />
      </div>
      <div>
        <p2 className="title-of-page">Thông tin trạng thái đơn hàng</p2>
      </div>

      {["Đơn hàng đã bị hủy", "Đơn hàng đã bán", "Số lượng sản phẩm còn trong kho", "Đơn hàng đang vận chuyển"].map((title, index) => (
        <div key={index} className="status-section">
          <div className="status-header" onClick={() => toggleExpand(index)}>
            <span>{title}</span>
            <span>{isExpanded[index] ? "▲" : "▼"}</span>
          </div>
          {isExpanded[index] && (
            <div className="status-content">
              {index === 2 ? (
                <div className="stasub">
                  <img src="BG.jpg" alt="" className="status-info" />
                </div>
              ) : (
                <p>Chưa có dữ liệu.</p>
              )}
            </div>
          )}
        </div>
      ))}
      <FooterEnd />
    </div>
  );
};

export default Status_Products;