import React from 'react';
import './Orders.css'; 
import ShopD from "../../components/Drawers/Shop";
import FooterEnd from '../../components/Footer/FooterEnd';

const orders = [
  {
    customer: "Nguyễn Văn A",
    phone: "0982.485.xxx",
    date: "02 / 09 / 2024",
    address: "Đường abc, Phường Bình Hòa, Thị Xã Thuận An, Tỉnh Bình Dương",
    products: [
      { name: "Tên sản phẩm", quantity: 2 },
      { name: "Tên sản phẩm", quantity: 1 },
      { name: "Tên sản phẩm", quantity: 1 },
      { name: "Tên sản phẩm", quantity: 1 },
    ],
  },
  {
    customer: "Nguyễn Văn A",
    phone: "0982.485.xxx",
    date: "02 / 09 / 2024",
    address: "Đường abc, Phường Bình Hòa, Thị Xã Thuận An, Tỉnh Bình Dương",
    products: [
      { name: "Tên sản phẩm", quantity: 1 },
      { name: "Tên sản phẩm", quantity: 1 },
      { name: "Tên sản phẩm", quantity: 1 },
      { name: "Tên sản phẩm", quantity: 1 },
    ],
  },
];

const Order = ({ order }) => {
  return (
    <div className="order">
      <div className="order-header">
        <p><b>{order.customer}</b> - SDT: {order.phone}</p>
        <p>Ngày: {order.date}</p>
        <p>Địa chỉ: {order.address}</p>
      </div>
      <div className="products-grid">
        {order.products.map((product, index) => (
          <div key={index} className="product">
            <div className="product-image"></div>
            <div className="product-info">
              <p>{product.name}</p>
              <p>Số lượng: {product.quantity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Orders = () => {
  return (
    <div className="orders-page">
      <div className='content'>
        <h2 className="title">Danh sách đơn hàng đang giao</h2>
        <div className="orders-list">
          {orders.map((order, index) => (
            <Order key={index} order={order} />
          ))}
        </div>
      </div>
      <FooterEnd/>
    </div>
  );
};

export default Orders;
