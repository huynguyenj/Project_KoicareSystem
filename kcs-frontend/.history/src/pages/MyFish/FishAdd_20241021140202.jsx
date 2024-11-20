import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Card,
  Divider,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast

const FishForm = () => {
  const [formData, setFormData] = useState({
    fishName: "",
    type: "",
    shape: "",
    size: "",
    weight: "",
    gender: "",
    age: "",
    origin: "",
    price: "",
    health: "",
    image: null, // Add an image property to store the uploaded image
  });

  const [imagePreview, setImagePreview] = useState(null); // Add a state to store the image preview

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file }); // Update the image property with the selected file
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result); // Update the image preview state with the file contents
    };
    reader.readAsDataURL(file);
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
      
    const data = new FormData();
    // Append form data to FormData object
    data.append("fishName", formData);
    data.append("fishImg", formData);
    data.append("fishSize", formData);
    data.append("fishShape", formData);
    data.append("fishAge", formData);
    data.append("fishWeight", formData);
    data.append("fishGender", formData);
    data.append("fishHealth", formData);
    data.append("fishType", formData);
    data.append("origin", formData);
    data.append("price", formData);

    console.log("Form submitted:", formData);
    try {
       
        toast.success("Hồ cá đã được thêm thành công!");
        
    } catch (error) {
        console.log(error)
        toast.error("Có lỗi xảy ra khi thêm hồ cá.");
    }
};

  return (
    <>
    <ToastContainer/>
     <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 4,
      }}
    >
      <Grid container spacing={5}>
        {/* Left Side - Image and Buttons */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ padding: 3, textAlign: "center", boxShadow: 6 }}>
            <Typography variant="h6">Thêm cá của tôi</Typography>
            <Divider sx={{ margin: "10px 0" }} />
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Fish"
                style={{
                  width: "50%",
                  height: "auto",
                  borderRadius: "8px",
                  marginBottom: "20px",
                }}
              />
            ) : (
              <></>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
              id="image-input"
            />
            <Button
              component="label"
              htmlFor="image-input"
              variant="contained"
              color="success"
              sx={{ marginBottom: 2, width: "100%" }}
            >
              Chọn ảnh cá
            </Button>
            <Button
              component={Link}
              to="/userhome/myfishlist"
              variant="contained"
              color="info"
              sx={{ marginBottom: 2, width: "100%" }}
            >
              Xem danh sách cá của tôi
            </Button>
          </Card>
        </Grid>

        {/* Right Side - Form */}
        <Grid item xs={12} sm={8}>
          <Card sx={{ padding: 3, boxShadow: 6 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Tên của cá"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Giống loài"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Vóc dáng"
                    name="shape"
                    value={formData.shape}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Kích thước"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Trọng lượng"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Giới tính"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Tuổi"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Tình trạng sức khỏe"
                    name="health"
                    value={formData.health}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nguồn gốc / Xuất xứ"
                    name="origin"
                    value={formData.origin}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Giá trị của cá"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              <Box sx={{ textAlign: "right", marginTop: 3 }}>
                <Button type="submit" variant="contained" color="primary">
                  Lưu
                </Button>
              </Box>
            </form>
          </Card>
        </Grid>
      </Grid>
    </Box>
    </>
   
  );
};

export default FishForm;