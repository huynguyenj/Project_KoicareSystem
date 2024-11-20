
import React, { useEffect, useState ,useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Button , Box, Grid, TextField, Alert, CircularProgress} from '@mui/material';
import { ToastContainer, toast } from "react-toastify";
import { getPond, getPondWaterParam, updatePond } from '../../api/pond_fish';

const style = {
    container1: {
        gridTemplateColumns: 'repeat(minmax(420px, 1fr))',
        margin: '0 auto',
        padding: '10px',
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
        padding: '10px',
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
        marginBottom: '20px',
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
        marginTop: '10px',
        marginRight: '10px',
        height: '40px',
    },
    textField: {
        marginBottom: '20px',
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
    error: {
        marginBottom: '10px',
    }
};

function PondInfo() {
    const { id } = useParams();
  
    const [pond,setPond] = useState({});

    useEffect(()=>{
        getPondInfo();
    },[])


    
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});
    const fileInputRef = useRef(null);
    const [update,setUpdate] = useState(false)
    const [pondData, setPondData] = useState({
        name: '',
        size: 0,
        depth: 0,
        volume: 0,
        drainCount: 0,
        pumpCapacity: 0,
        creationDate: '',
        image: null,
    });

    useEffect(() => {
        setPondData({
            name: pond.pondName || '',
            size: pond.size || 0,
            depth: pond.depth || 0,
            volume: pond.volume || 0,
            drainCount: pond.drainCount || 0,
            pumpCapacity: pond.pumpCapacity || 0,
            creationDate: pond.date || '',
            image: pond.pondImg || '',
        });
    }, [pond]);
    
    const getPondInfo = async ()=>{
        try {
            const res = await getPond(id);
            setPond(res.result)
        } catch (error) {
            console.log(error)
            toast.error("Xảy ra lỗi trong quá trình lấy dữ liệu!");
        }
      
    }
    const validateFields = () => {
        const newErrors = {};
        if (!pondData.name || pondData.name.trim() === '') {
            newErrors.name = 'Tên ao không được để trống';
        }
        if (!pondData.depth || pondData.depth <= 0) {
            newErrors.depth = 'Độ sâu phải lớn hơn 0';
        }
        if (!pondData.size || pondData.size <= 0) {
            newErrors.size = 'Kích thước phải lớn hơn 0';
        }
        if (!pondData.volume || pondData.volume <= 0) {
            newErrors.volume = 'Thể tích phải lớn hơn 0';
        }
        if (!pondData.pumpCapacity || pondData.pumpCapacity <= 0) {
            newErrors.pumpCapacity = 'Công suất bơm phải lớn hơn 0';
        }
        if (!pondData.drainCount || pondData.drainCount <= 0) {
            newErrors.drainCount = 'Số lượng cống thải phải lớn hơn 0';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    const [imagePreview, setImagePreview] = useState(null);
    const handleChange = (field) => (event) => {
        const value = event.target.value;
        setPondData({
            ...pondData,
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
                setPondData({
                    ...pondData,
                    image: file
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
            // Append form data to FormData object
            data.append("pondName", pondData.name);

          
         // Append the image only if it's a File object
         if (pondData.image instanceof File) {
            data.append("pondImg", pondData.image);  // Append the file
        } 
            data.append("size", pondData.size);
            data.append("depth", pondData.depth);
            data.append("volume", pondData.volume);
            data.append("drainCount", pondData.drainCount);
            data.append("pumpCapacity", pondData.pumpCapacity);
            console.log('Saving changes:', pondData);
           try {
            await updatePond(pond.pondId,data);
            toast.success("Cập nhật hồ cá thành công!")
            getPondInfo();
            setIsEditing(false);
           } catch (error) {
                toast.error("Cập nhật hồ cá thất bại!");
                console.log(error)
           }finally{
            setUpdate(false)
           }
           
        }
    };

    const handleCancel = () => {
        setPondData({
            name: pond.pondName || '',
            size: pond.size || 0,
            depth: pond.depth || 0,
            volume: pond.volume || 0,
            drainCount: pond.drainCount || 0,
            pumpCapacity: pond.pumpCapacity || 0,
            creationDate: pond.date || '',
            image: pond.pondImg || '',
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
                    <img src={fishData.image} alt={fishData.name} style={style.image} />
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        style={style.hiddenInput}
                    />
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
                            <p style={style.p}>Giá trị: {fishData.price}$</p>
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
                                <p style={style.p}>Kích thước: {fishData.size}m</p>
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
    
        
    );
}

export default PondInfo;