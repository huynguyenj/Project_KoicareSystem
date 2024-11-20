import React, { useState } from "react";
import "./AddProducts.css";
import FooterEnd from "../../../components/Footer/FooterEnd";
import ShopD from "../../../components/Drawers/Shop";

const AddProducts = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productType, setProductType] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [productContent, setProductContent] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  // State to hold the selected image
  const [image, setImage] = useState(null);
  const [error, setError] = useState({});
  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    setImage(file);
    reader.onload = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const newError = {};

    if (!productName || productName.trim() === "") {
      newError.name = "Tên sản phẩm không được để trống!";
    }
    if (!productPrice || productPrice <= 0) {
      newError.price = "Giá tiền không được để trống, ít hơn 0!";
    }
    if (!productType || productType.trim() === "") {
      newError.type = "Loại sản phẩm không được để trống!";
    }
    if (!productQuantity || productQuantity <= 0) {
      newError.quantity = "Số lượng không được để trống!";
    }
    if (!productContent || productContent === "") {
      newError.content = "Nội dung sản phẩm không được để trống!";
    }
    setError(newError);

    return Object.keys(newError).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    if(validate()){
      setLoading(true)
      console.log({
        productName,
        productPrice,
        productType,
        productContent,
        image,
      });

      const data = new FormData();
      data.append("productName",productName)
      data.append("price",productPrice)
      data.append("category",productType)
      data.append(:)
  
      setSuccessMessage("Bạn đã tạo thành công!!!");
    }


  };

  return (
    <>
     

      <div className="container">
        <div className="title-product">
          <h2>Thêm Ảnh Sản Phẩm</h2>
        </div>
        <div className="product-image">
          <div className="product-image-show">
            {imagePreview? <img src={imagePreview} alt="Product" />:"" }
           
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
           {error.name ? <p className="alert alert-danger">{error.name}</p>:null }
          <input
            type="number"
            placeholder="Giá sản phẩm"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
          {error.price ? <p className="alert alert-danger">{error.price}</p>:null }

          <input
            type="number"
            placeholder="Số lượng"
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
          />
          {error.quantity ? <p className="alert alert-danger">{error.quantity}</p>:null }

          <select
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
          >
            <option value="">Chọn loại mặt hàng</option>{" "}
            {/* Tùy chọn mặc định */}
            <option value="Loai1">FOOD</option>
            <option value="Loai2">EQUIPMENT</option>
            {/* Thêm các tùy chọn khác nếu cần */}
          </select>
          {error.type ? <p className="alert alert-danger">{error.type}</p>:null }

          <textarea
            placeholder="Nội dung sản phẩm"
            value={productContent}
            onChange={(e) => setProductContent(e.target.value)}
          />
          {error.content ? <p className="alert alert-danger">{error.content}</p>:null }

          <div className="actions">
            <button type="submit">Thêm sản phẩm</button>
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}
          </div>
        </form>
      </div>

      <FooterEnd />
    </>
  );
};

export default AddProducts;
