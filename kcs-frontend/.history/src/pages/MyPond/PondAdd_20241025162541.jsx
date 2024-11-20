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
import { addPond } from "../../api/pond_fish";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS for the toast

function PondAdd() {
  const [update, setUpdate] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    pondName: "",
    pondImg: null,
    size: "",
    depth: "",
    volume: "",
    drainCount: "",
    pumpCapacity: "",
  });

  const validateFields = () => {
    const newErrors = {};
    if (!formData.pondName || formData.pondName.trim() === '') {
        newErrors.name = 'Tên ao không được để trống';
    }
    if (!formData.depth || formData.depth <= 0) {
        newErrors.depth = 'Độ sâu phải lớn hơn 0';
    }
    if (!formData.size || formData.size <= 0) {
        newErrors.size = 'Kích thước phải lớn hơn 0';
    }
    if (!formData.volume || formData.volume <= 0) {
        newErrors.volume = 'Thể tích phải lớn hơn 0';
    }
    if (!formData.pumpCapacity || formData.pumpCapacity <= 0) {
        newErrors.pumpCapacity = 'Công suất bơm phải lớn hơn 0';
    }
    if (!formData.drainCount || formData.drainCount <= 0) {
        newErrors.drainCount = 'Số lượng cống thải phải lớn hơn 0';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, pondImg: file }); // Update the image property with the selected file
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result); // Update the image preview state with the file contents
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdate(true)
    const data = new FormData();
    // Append form data to FormData object
    data.append("pondName", formData.pondName);
    data.append("pondImg", formData.pondImg);
    data.append("size", formData.size);
    data.append("depth", formData.depth);
    data.append("volume", formData.volume);
    data.append("drainCount", formData.drainCount);
    data.append("pumpCapacity", formData.pumpCapacity);
    console.log("Form submitted:", formData);
    try {
      await addPond(data);
      toast.success("Hồ cá đã được thêm thành công!");
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra khi thêm hồ cá.");
    }finally{
        setUpdate(false)
    }
  };

  const style = {
    head: {
      textAlign: "center",
      fontSize: "40px",
      fontFamily: "Arial",
      padding: "0",
      margin: "0",
    },
    hr: {
      width: "800px",
      textAlign: "center",
      margin: "0px auto",
      borderTop: "2px solid #000000",
    },
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />

      <Typography style={style.head} variant="h6">
        Thêm hồ cá của tôi
      </Typography>
      <hr style={style.hr} />
      <Box
        sx={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 5,
        }}
      >
        <Grid container spacing={5}>
          {/* Left Side - Image and Buttons */}
          <Grid item xs={12} sm={4}>
            <Card sx={{ padding: 3, textAlign: "center", boxShadow: 6 }}>
              <Divider sx={{ margin: "10px 0" }} />
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Pond"
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
                Chọn ảnh hồ cá
              </Button>
              <Button
                component={Link}
                to="/userhome/pondlist"
                variant="contained"
                color="info"
                sx={{ marginBottom: 2, width: "100%" }}
              >
                Xem danh sách hồ cá của tôi
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
                      label="Tên hồ cá"
                      name="pondName"
                      value={formData.pondName}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Kích thước của hồ(mét)"
                      name="size"
                      value={formData.size}
                      onChange={handleChange}
                      error={!!errors.size}
                      helperText={errors.size}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Độ sâu(mét)"
                      name="depth"
                      value={formData.depth}
                      onChange={handleChange}
                      error={!!errors.depth}
                      helperText={errors.depth}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Thể tích(lít)"
                      name="volume"
                      value={formData.volume}
                      onChange={handleChange}
                      error={!!errors.volume}
                      helperText={errors.volume}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Số lượng cống thoát"
                      name="drainCount"
                      value={formData.drainCount}
                      onChange={handleChange}
                      error={!!errors.drainCount}
                      helperText={errors.drainCount}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Công suất bơm(w)"
                      name="pumpCapacity"
                      value={formData.pumpCapacity}
                      onChange={handleChange}
                      
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
}

export default PondAdd;
