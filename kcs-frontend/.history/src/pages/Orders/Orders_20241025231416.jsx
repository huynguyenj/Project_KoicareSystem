import React from 'react';
import './Orders.css'; 
import ShopD from "../../components/Drawers/Shop";
import FooterEnd from '../../components/Footer/FooterEnd';



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
