import React from 'react';
import './ShowProduct.css';

const ShowProduct = () => {
  return (
    <div className="app-container">
      <div className="sidebar">
        <div className="admin-info">
          <div className="admin-avatar"></div>
          <span>Xin chào admin</span>
        </div>
        <ul className="menu-list">
          <li>Sản phẩm</li>
          <li>Đơn hàng</li>
          <li>Khuyến mãi</li>
          <li>Doanh thu</li>
          <li>Trạng thái</li>
        </ul>
      </div>
      
      <div className="main-content">
        <div className="header">
          <h1>Tất cả sản phẩm</h1>
          <div className="action-buttons">
            <button>Thêm sản phẩm</button>
            <button>Xóa sản phẩm</button>
            <button>Cập nhật</button>
          </div>
          <input type="text" placeholder="Tìm kiếm sản phẩm" className="search-bar"/>
        </div>

        <div className="product-list">
          {Array(5).fill(null).map((_, index) => (
            <div className="product-item" key={index}>
              <input type="checkbox" />
              <div className="product-info">
                <h2>Tên sản phẩm</h2>
                <p>Nội dung sản phẩm</p>
              </div>
              <div className="product-meta">
                <p>Giá: XXX.000đ</p>
                <p>Đánh giá: {Math.random() * 5}.0 ★</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
