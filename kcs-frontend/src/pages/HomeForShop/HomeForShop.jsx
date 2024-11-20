import React from 'react';
import FooterEnd from "../../components/Footer/FooterEnd";
import ShopD from "../../components/Drawers/Shop";
import './HomeForShop.css';

const HomeForShop = () => {
  return (
    <div className="homepage">
     
      <div className="image-gallery">
        <img src="image1Shop.png" alt="Header Left" className="gallery-img" />
        <img src="image2Shop.png" alt="Koi Pond" className="gallery-img" />
        <img src="image3Shop.png" alt="Header Right" className="gallery-img" />
      </div>
      <div className="navigation">
        <h2>Danh mục lựa chọn</h2>
      </div>
      <div className="nav-options">
        <div className="nav-item">Sản phẩm</div>
        <div className="nav-item">Đơn hàng</div>
        <div className="nav-item">Doanh thu</div>
        <div className="nav-item">Trạng thái</div>
        </div>
      <FooterEnd />
    </div>
  );
};

export default HomeForShop;
