import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, useLocation, Form } from 'react-router-dom';
import { Box, Button, Grid, TextField, Alert } from '@mui/material';
import { ToastContainer, toast } from "react-toastify";
import { getFishInfo, updateFishInfo } from '../../api/pond_fish';

const style = {
    container1: {
        gridTemplateColumns: 'repeat(minmax(420px, 1fr))',
        margin: '0 auto',
        padding: '12px',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(2, 4, 4, 8)',
        fontFamily: 'Arial, sansSerif',
        fontSize: '17px',
        width: '360px',
    },
    container2: {
        display: "grid",
        gridTemplateColumns: 'repeat(auto-fit, minmax(600px, 1fr))',
        gap: '10px',
        fontSize: '17px',
        fontFamily: 'Arial, sansSerif',
        margin: '0 auto',
        padding: '14px',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(2, 4, 4, 8)',
        minHeight: '400px',

    },
    image: {
        width: '100%',
        height: '250px',
        objectFit: 'cover',
        borderRadius: '8px',
        marginBottom: '10px',
    },
    h2: {
        color: '#2c3e50',
        marginBottom: '10px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',

    },
    p: {
        color: '#34495e',
        marginBottom: '5px',
        backgroundColor: 'white',
        padding: '8px',
        border: '1px solid #808080',
        borderRadius: '4px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
    },
    button: {
        marginTop: '5px',
        marginRight: '10px',
        height: '40px',
    },
    textField: {
        marginBottom: '10px',
        backgroundColor: '#ffffff',
        borderRadius: '4px',
        height: '40px',
    },
    buttonContainer: {
        display: 'flex',
        gap: '10px',
        marginBottom: '2px',
    },
    fieldContainer: {
        display: 'grid',
        gap: '15px',
    },
    hiddenInput: {
        display: 'none',
    },

};

function FishInfo() {
      const { id } = useParams();
      const [isEditing, setIsEditing] = useState(false);
      const [errors, setErrors] = useState({});
      const fileInputRef = useRef(null);
      const [fish, setFish] = useState({});
      const [update, setUpdate] = useState(false);
      const [imagePreview, setImagePreview] = useState(null);
    const [fishData, setFishData] = useState({
      id,
      name: '',
      size: 0,
      shape: '',
      age: 0,
      weight: 0,
      gender: '',
      type: '',
      health: '',
      origin: '',
      price: 0,
      image: null,
  });
  useEffect(()=>{
      getFish();
  },[])

  useEffect(() => {
      setFishData({
          name: fish.fishName || '',
          size: fish.fishSize || 0,
          shape: fish.fishShape || '',
          age: fish.fishAge || 0,
          weight: fish.fishWeight || 0,
          gender: fish.fishGender || '',
          type: fish.fishType || '',
          health: fish.fisHHealth || '',
          origin: fish.origin || '',
          price: fish.price || 0,
          image: fish.fishImg || '', // Assuming fishImg is the image property
      });
  }, [fish]); // Ensure 'fish' is defined and being passed as a prop or state
  
    const getFish = async () => {
            try {
                 const res = await getFishInfo(id)
                 setFish(res.result)
            } catch (error) {
                console.log(error)
                toast.error("Lấy dữ liệu thất bại!")  
            }
    }
    const validateFields = () => {
        const newErrors = {};
        if (!fishData.name || fishData.name.trim() === '') {
            newErrors.name = 'Tên ao không được để trống';
        }
        if (!fishData.age || fishData.age <= 0) {
            newErrors.age = 'Tuổi phải lớn hơn 0';
        }
        if (!fishData.price || fishData.price <= 0) {
            newErrors.price = 'Giá trị phải lớn hơn 0';
        }
        if (!fishData.size || fishData.size <= 0) {
            newErrors.size = 'Kích thước phải lớn hơn 0';
        }
        if (!fishData.weight || fishData.weight <= 0) {
            newErrors.weight = 'Cân nặng phải lớn hơn 0';
        }
        if (!fishData.shape || fishData.shape.trim() === '') {
            newErrors.shape = 'Vóc dáng không được để trống';
        }
        if (!fishData.gender || !(fishData.gender.trim() === 'đực' || fishData.gender.trim() === 'cái')) {
            newErrors.gender = 'Giới tính phải là đực hoặc cái';
        }
        if (!fishData.type || fishData.type.trim() === '') {
            newErrors.type = 'Giống loài không được để trống';
        }
        if (!fishData.origin || fishData.origin.trim() === '') {
            newErrors.origin = 'Xuất xứ không được để trống';
        }
        if (!fishData.health || fishData.health.trim() === '') {
            newErrors.health = 'Tình trạng sức khỏe không được để trống';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (field) => (event) => {
        const value = event.target.value;
        setFishData({
            ...fishData,
            [field]: value
        });
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors({
                ...errors,
                [field]: undefined
            });
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFishData({
                    ...fishData,
                    image: reader.result
                });
                setImagePreview(reader.result)
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleSave = async () => {
        if (validateFields()) {
            setUpdate(true)
          const data = new FormData();
            
          data.append("fishName",fishData.name)
           // Append the image only if it's a File object
         if (fishData.image instanceof File) {
            data.append("fishImg", fishData.image);  // Append the file
        }
         data.append("fishSize",fishData.size);
         data.append("fishShape",fishData.shape);
         data.append("fishAge",fishData.age);
         data.append("fishWeight",fishData.weight);
         data.append("fishGender",fishData.gender);
         data.append("fishHealth",fishData.health);
         data.append("fishType",fishData.type);
         data.append("origin",fishData.origin);
         data.append("price",fishData.price);
         console.log(data.get("fishImg"))
         try {
            await updateFishInfo(id,data)
            toast.success("Cập nhật thành công")
         } catch (error) {
            console.log(error)
            toast.error("Cập nhật thất bại!")
         }finally{
            setUpdate(false)
         } 
        }
    };

    const handleCancel = () => {
        setFishData({
            name: fish.fishName||'',
            size: fish.fishSize||'',
            shape: fish.fishShape||'',
            age: fish.fishAge||'',
            weight: fish.fishWeight,
            gender: fish.fishGender,
            type: fish.fishType,
            health: fish.fishHealth,
            origin: fish.origin,
            price: fish.price,
            image: fish.fishImg,
        });
        setErrors({});
        setIsEditing(false);
    };
    return (
      <div>
      <ToastContainer />
      <Box sx={{
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 5,
          backgroundColor: '#DCDCDC'
      }}>
          <Grid container spacing={2}>
              <div item xs={12} sm={4} style={style.container1}>
                  {isEditing ? (
                      <>
                          <TextField
                              label="Tên"
                              fullWidth
                              value={fishData.name}
                              onChange={handleChange('name')}
                              style={{ ...style.textField, marginBottom: '25px' }}
                              size="small"
                              error={!!errors.name}
                              helperText={errors.name}
                          />
                      </>
                  ) : (
                      <h2 style={style.h2}>{fishData.name}</h2>
                  )}
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
                        <><img src={fishData.image} alt={fishData.name} style={style.image} />
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            accept="image/*"
                            style={style.hiddenInput}
                        /></>
                    )}
                  {isEditing ? (
                      <>
                          <TextField
                              label="Tuổi"
                              type="number"
                              value={fishData.age}
                              onChange={handleChange('age')}
                              fullWidth
                              size="small"
                              style={{ ...style.textField, marginBottom: '24px' }}
                              error={!!errors.age}
                              helperText={errors.age}
                          />
                          <TextField
                              label="Giá trị"
                              fullWidth
                              value={fishData.price}
                              onChange={handleChange('price')}
                              style={{ ...style.textField, marginBottom: '20px' }}
                              size="small"
                              error={!!errors.price}
                              helperText={errors.price}
                          />
                      </>
                  ) : (
                      <>
                          <p style={style.p}>Tuổi: {fishData.age}</p>
                          <p style={style.p}>Giá trị: {fishData.price} VND</p>
                      </>
                  )}
                  <Button
                      component={Link}
                      to="/userhome/myfishlist"
                      variant="contained"
                      color="primary"
                      style={style.button}
                  >
                      Quay lại danh sách cá
                  </Button>
              </div>
              <div item xs={12} sm={6} style={style.container2}>
                  <div style={style.buttonContainer}>
                      {isEditing ? (
                          <>
                              <Button
                                  variant="contained"
                                  color="success"
                                  onClick={handleSave}
                                  style={style.button}
                              >
                                  Lưu thay đổi
                              </Button>
                              <Button
                                  variant="contained"
                                  color="error"
                                  onClick={handleCancel}
                                  style={style.button}
                              >
                                  Hủy
                              </Button>
                              <Button
                                  variant="contained"
                                  color="inherit"
                                  onClick={handleImageClick}
                                  style={style.button}
                              >
                                  Chọn hình ảnh khác
                              </Button>
                          </>
                      ) : (
                          <Button
                              variant="contained"
                              color="success"
                              onClick={() => setIsEditing(true)}
                              style={style.button}
                          >
                              Chỉnh sửa thông tin
                          </Button>
                      )} 
                     
                  </div>
                  <div style={style.fieldContainer}>
                      {isEditing ? (
                          <>
                              <TextField
                                  label="Kích thước (m)"
                                  type="number"
                                  value={fishData.size}
                                  onChange={handleChange('size')}
                                  fullWidth
                                  size="small"
                                  style={style.textField}
                                  error={!!errors.size}
                                  helperText={errors.size}
                              />
                              <TextField
                                  label="Cân nặng (kg)"
                                  type="number"
                                  value={fishData.weight}
                                  onChange={handleChange('weight')}
                                  fullWidth
                                  size="small"
                                  style={style.textField}
                                  error={!!errors.weight}
                                  helperText={errors.weight}
                              />
                              <TextField
                                  label="Vóc dáng"
                                  value={fishData.shape}
                                  onChange={handleChange('shape')}
                                  fullWidth
                                  size="small"
                                  style={style.textField}
                                  error={!!errors.shape}
                                  helperText={errors.shape}
                              />
                              <TextField
                                  label="Giới tính"
                                  value={fishData.gender}
                                  onChange={handleChange('gender')}
                                  fullWidth
                                  size="small"
                                  style={style.textField}
                                  error={!!errors.gender}
                                  helperText={errors.gender}
                              />
                              <TextField
                                  label="Giống loài"
                                  value={fishData.type}
                                  onChange={handleChange('type')}
                                  fullWidth
                                  size="small"
                                  style={style.textField}
                                  error={!!errors.type}
                                  helperText={errors.type}
                              />
                              <TextField
                                  label="Xuất xứ"
                                  value={fishData.origin}
                                  onChange={handleChange('origin')}
                                  fullWidth
                                  size="small"
                                  style={style.textField}
                                  error={!!errors.origin}
                                  helperText={errors.origin}
                              />
                              <TextField
                                  label="Tình trạng sức khỏe"
                                  value={fishData.health}
                                  onChange={handleChange('health')}
                                  fullWidth
                                  size="small"
                                  style={style.textField}
                                  error={!!errors.health}
                                  helperText={errors.health}
                              />
                          </>
                      ) : (
                          <>
                              <p style={style.p}>Kích thước: {fishData.size}cm</p>
                              <p style={style.p}>Cân nặng: {fishData.weight}kg</p>
                              <p style={style.p}>Vóc dáng: {fishData.shape}</p>
                              <p style={style.p}>Giới tính: {fishData.gender}</p>
                              <p style={style.p}>Giống loài: {fishData.type}</p>
                              <p style={style.p}>Xuất xứ: {fishData.origin}</p>
                              <p style={style.p}>Tình trạng sức khỏe: {fishData.health}</p>
                          </>
                      )}
                  </div>
              </div>
          </Grid>
      </Box>
  </div>
    )  
}

export default FishInfo