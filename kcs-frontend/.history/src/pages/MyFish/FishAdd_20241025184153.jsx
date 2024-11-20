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
  CircularProgress,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import { addFish } from "../../api/pond_fish";

const FishForm = () => {
  const [update, setUpdate] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    fishName: "",
    fishImg: null, // Add an image property to store the uploaded image
    fishSize: "",
    fishShape: "",
    fishAge: "",
    fishWeight: "",
    fishGender: "",
    fishHealth: "",
    fishType: "",
    origin: "",
    price: "",
  });

  const [imagePreview, setImagePreview] = useState(null); // Add a state to store the image preview

  const validateFields = () => {
    const newErrors = {};
    if (!formData.fishName || formData.fishName.trim() === "") {
      newErrors.name = "Tên cá không được để trống";
    }
    if (!formData.fishAge || formData.fishAge <= 0) {
      newErrors.age = "Tuổi phải lớn hơn 0";
    }
    if (!formData.price || formData.price <= 0) {
      newErrors.price = "Giá trị phải lớn hơn 0";
    }
    if (!formData.fishSize || formData.fishSize <= 0) {
      newErrors.size = "Kích thước phải lớn hơn 0";
    }
    if (!formData.fishWeight || formData.fishWeight <= 0) {
      newErrors.weight = "Cân nặng phải lớn hơn 0";
    }
    if (!formData.fishShape || formData.fishShape.trim() === "") {
      newErrors.shape = "Vóc dáng không được để trống";
    }
    if (
      !formData.fishGender ||
      !(formData.fishGender.trim().toLowerCase() === "đực" || formData.fishGender.trim().toLowerCase() === "cái")
    ) {
      newErrors.gender = "Giới tính phải là đực hoặc cái";
    }
    if (!formData.fishType || formData.fishType.trim() === "") {
      newErrors.type = "Giống loài không được để trống";
    }
    if (!formData.origin || formData.origin.trim() === "") {
      newErrors.origin = "Xuất xứ không được để trống";
    }
    if (!formData.fishHealth || formData.fishHealth.trim() === "") {
      newErrors.health = "Tình trạng sức khỏe không được để trống";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, fishImg: file }); // Update the image property with the selected file
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result); // Update the image preview state with the file contents
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(validateFields()){
      setUpdate(true)
      data.append("fishName", formData.fishName);
      data.append("fishImg", formData.fishImg);
      data.append("fishSize", formData.fishSize);
      data.append("fishShape", formData.fishShape);
      data.append("fishAge", formData.fishAge);
      data.append("fishWeight", formData.fishWeight);
      data.append("fishGender", formData.fishGender);
      data.append("fishHealth", formData.fishHealth);
      data.append("fishType", formData.fishType);
      data.append("origin", formData.);
      data.append("price", formData);
  
      console.log("Form submitted:", formData);
      try {
        await addFish(formData);
        toast.success("Cá đã được thêm thành công!");
      } catch (error) {
        console.log(error);
        toast.error("Có lỗi xảy ra khi thêm cá.");
      }finally{
        setUpdate(false)
      }
    }
    const data = new FormData();
    // Append form data to FormData object
   
  };

  return (
    <>
      <ToastContainer />
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
                  <Grid item xs={12} sm={12}>
                    <TextField
                      fullWidth
                      label="Tên của cá"
                      name="fishName"
                      value={formData.fishName}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      select
                      label=""
                      name="fishType"
                      value={formData.fishType}
                      onChange={handleChange}
                      error={!!errors.type}
                      helperText={errors.type}
                      SelectProps={{
                        native: true,
                      }}
                    >
                      <option value="">Chọn giống loài</option>
                      <option value="Asagi">Asagi</option>
                      <option value="Bekko">Bekko</option>
                      <option value="Doitsu">Doitsu</option>
                      <option value="Ginrin">Ginrin</option>
                      <option value="Goshiki">Goshiki</option>
                      <option value="Hirenaga">Hirenaga / Butterfly</option>
                      <option value="Kawarimono">Kawarimono</option>
                      <option value="Kikokuryu">Kikokuryu</option>
                      <option value="Kohaku">Kohaku</option>
                      <option value="Koromo">Koromo</option>
                      <option value="Ogon">Ogon</option>
                      <option value="Platinum">Platinum</option>
                      <option value="Showa">Showa</option>
                      <option value="Shusui">Shusui</option>
                      <option value="Taisho Sanke">Taisho Sanke</option>
                      <option value="Tancho">Tancho</option>
                      <option value="Utsurimono">Utsurimono</option>
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Vóc dáng"
                      name="fishShape"
                      value={formData.fishShape}
                      onChange={handleChange}
                      error={!!errors.shape}
                      helperText={errors.shape}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Kích thước"
                      name="fishSize"
                      value={formData.fishSize}
                      onChange={handleChange}
                      error={!!errors.size}
                      helperText={errors.size}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Trọng lượng(kg)"
                      name="fishWeight"
                      value={formData.fishWeight}
                      onChange={handleChange}
                      error={!!errors.weight}
                      helperText={errors.weight}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Giới tính"
                      name="fishGender"
                      value={formData.fishGender}
                      onChange={handleChange}
                      error={!!errors.gender}
                      helperText={errors.gender}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Tuổi"
                      name="fishAge"
                      value={formData.fishAge}
                      onChange={handleChange}
                      error={!!errors.age}
                      helperText={errors.age}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Tình trạng sức khỏe"
                      name="fishHealth"
                      value={formData.fishHealth}
                      onChange={handleChange}
                      error={!!errors.health}
                      helperText={errors.health}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Nguồn gốc / Xuất xứ"
                      name="origin"
                      value={formData.origin}
                      onChange={handleChange}
                      error={!!errors.origin}
                      helperText={errors.origin}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Giá trị của cá(VND)  "
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      error={!!errors.price}
                      helperText={errors.price}
                    />
                  </Grid>
                </Grid>
                <Box sx={{ textAlign: "right", marginTop: 3 }}>
                  <Button
                    variant="contained"
                    color="success"
                    type="submit"
                    disabled={update}
                  >
                    {update ? <CircularProgress color="inherit" /> : "Lưu"}
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
