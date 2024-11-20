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

function PondAdd() {

    const [formData, setFormData] = useState({
        name: "",
        image: null,
        size: "",
        depth: "",
        volumn: "",
        drainCount: "",
        pumpCapacity: ""
    });

  
    const [imagePreview, setImagePreview] = useState(null);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
    };

    const style = {
        head: {
            textAlign: 'center', fontSize: '40px', fontFamily: 'Arial', padding: '0', margin: '0'
        },
        hr: {
            width: '800px', textAlign: 'center', margin: '0px auto', borderTop: '2px solid #000000'
        },
    };


    return (
        <>
        <Typography style={style.head} variant="h6">Thêm hồ cá của tôi</Typography>
        <hr style={style.hr}/>
        <Box sx={{
            height: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 5,
        }}>
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
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Kích thước của hồ"
                                        name="size"
                                        value={formData.size}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Độ sâu"
                                        name="depth"
                                        value={formData.depth}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Thể tích(lít)"
                                        name="volumn"
                                        value={formData.volumn}
                                        onChange={handleChange}
                                        
                                    />
                                    
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Số lượng cống thoát"
                                        name="drainCount"
                                        value={formData.drainCount}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Công suất bơm"
                                        name="pumpCapacity"
                                        value={formData.pumpCapacity}
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
    )
}

export default PondAdd
