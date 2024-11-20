import React, { useState } from "react";
import './AddProducts.css';
import FooterEnd from "../../../components/Footer/FooterEnd";
import ShopD from "../../../components/Drawers/Shop";

const AddProducts = () => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productType, setProductType] = useState('');
  const [productContent, setProductContent] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // State to hold the selected image
  const [image, setImage] = useState(null);

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Preview the image
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Logic for form submission (e.g., send data to server)
    console.log({ productName, productPrice, productType, productContent });

    setSuccessMessage("Bạn đã tạo thành công!!!");
  };

  return (
    <>

     
      {/* <div className="top-actions">
        <button className="action-btn">Thêm sản phẩm</button>
        <button className="action-btn">Xóa sản phẩm</button>
        <button className="action-btn">Sửa sản phẩm</button>
      </div> */}

      <div className="container">
        <div className="title-product">
          <h2>Thêm Ảnh Sản Phẩm</h2>
        </div>
        <div className="product-image">
          <div className="product-image-show">
            <img src={image ? image : "\\BG2.jpg"} alt="Product" />
          </div>
          <div className="upload-frame">
          <label htmlFor="file-upload" className="custom-file-upload">
            Bấm để thêm ảnh khác
          </label>
          <input 
            id="file-upload" 
            type="file" 
            onChange={handleImageUpload} 
            accept="image/*" 
          />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Tên sản phẩm" 
            value={productName} 
            onChange={(e) => setProductName(e.target.value)} 
          />

          <input 
            type="text" 
            placeholder="Giá sản phẩm" 
            value={productPrice} 
            onChange={(e) => setProductPrice(e.target.value)} 
          />

          <select 
            value={productType} 
            onChange={(e) => setProductType(e.target.value)}
          >
            <option value="">Chọn loại mặt hàng</option> {/* Tùy chọn mặc định */}
            <option value="Loai1">Đồ ăn</option>
            <option value="Loai2">Tăng cường sức khỏe cho cá</option>
            {/* Thêm các tùy chọn khác nếu cần */}
          </select>

          <textarea 
            placeholder="Nội dung sản phẩm" 
            value={productContent} 
            onChange={(e) => setProductContent(e.target.value)} 
          />

          <div className="actions">
            <button type="submit">Thêm sản phẩm</button>
            {successMessage && <div className="success-message">{successMessage}</div>}
          </div>
        </form>
      </div>

      <FooterEnd/>
    </>
  );
};

export default AddProducts;