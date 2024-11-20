
import React, { useEffect, useState ,useRef } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Button , Box, Grid, TextField, Alert} from '@mui/material';
import { ToastContainer, toast } from "react-toastify";
import { getPond } from '../../api/pond_fish';

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
        marginBottom: '5px',
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

    const getPondInfo = async ()=>{
        try {
            const res = await getPond(id);
            setPond(res.result)
        } catch (error) {
            console.log(error)
            toast.error("Xảy ra lỗi trong quá trình lấy dữ liệu!");
        }
      
    }
    
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});
    const fileInputRef = useRef(null);
    
    const [pondData, setPondData] = useState({
        name: '',
        size: 0,
        depth: 0,
        volume: 0,
        drainCount: 0,
        pumpCapacity: 0,
        creationDate: '',
        image: '',
    });

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
        if (!pondData.volumn || pondData.volumn <= 0) {
            newErrors.volumn = 'Thể tích phải lớn hơn 0';
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
                    image: reader.result
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleSave = () => {
        if (validateFields()) {
            console.log('Saving changes:', pondData);
            setIsEditing(false);
        }
    };

    const handleCancel = () => {
        setPondData({
            id,
            name: "Sample Pond",
            size: 50.5,
            depth: 4.0,
            volumn: 102.0,
            drainCount: 4,
            pumpCapacity: 20.0,
            creationDate: "2021-01-01",
            image: "https://i.pinimg.com/564x/b3/28/99/b32899495cf5a8bc7e016644e46fffed.jpg",
        });
        setErrors({});
        setIsEditing(false);
    };

    return (
        <div>
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
                                    fullWidth
                                    value={pondData.name}
                                    onChange={handleChange('name')}
                                    style={{ ...style.textField, marginBottom: '10px' }}
                                    size="small"
                                    error={!!errors.name}
                                    helperText={errors.name}
                                />
                            </>
                        ) : (
                            <h2 style={style.h2}>{pondData.name}</h2>
                        )}
                        <img src={pondData.image} alt={pondData.name} style={style.image} />
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            accept="image/*"
                            style={style.hiddenInput}
                        />
                        <Button 
                            component={Link} 
                            to="/userhome/pondlist" 
                            variant="contained" 
                            color="primary" 
                            style={style.button}
                        >
                            Back to Pond List
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
                        {Object.keys(errors).length > 0 && (
                            <Alert severity="error" style={style.error}>
                                Vui lòng điền đầy đủ thông tin
                            </Alert>
                        )}
                        <div style={style.fieldContainer}>
                            {isEditing ? (
                                <>
                                    <TextField
                                        label="Độ sâu (m)"
                                        type="number"
                                        value={pondData.depth}
                                        onChange={handleChange('depth')}
                                        fullWidth
                                        size="small"
                                        style={style.textField}
                                        error={!!errors.depth}
                                        helperText={errors.depth}
                                    />
                                    <TextField
                                        label="Kích thước"
                                        type="number"
                                        value={pondData.size}
                                        onChange={handleChange('size')}
                                        fullWidth
                                        size="small"
                                        style={style.textField}
                                        error={!!errors.size}
                                        helperText={errors.size}
                                    />
                                    <TextField
                                        label="Thể tích"
                                        type="number"
                                        value={pondData.volumn}
                                        onChange={handleChange('volumn')}
                                        fullWidth
                                        size="small"
                                        style={style.textField}
                                        error={!!errors.volumn}
                                        helperText={errors.volumn}
                                    />
                                    <TextField
                                        label="Công suất bơm"
                                        type="number"
                                        value={pondData.pumpCapacity}
                                        onChange={handleChange('pumpCapacity')}
                                        fullWidth
                                        size="small"
                                        style={style.textField}
                                        error={!!errors.pumpCapacity}
                                        helperText={errors.pumpCapacity}
                                    />
                                    <TextField
                                        label="Số lượng cống thải"
                                        type="number"
                                        value={pondData.drainCount}
                                        onChange={handleChange('drainCount')}
                                        fullWidth
                                        size="small"
                                        style={style.textField}
                                        error={!!errors.drainCount}
                                        helperText={errors.drainCount}
                                    />
                                </>
                            ) : (
                                <>
            <p style={style.p}>Số lượng cá: {Array.isArray(pond.fishResponses) ? pond.fishResponses.length : 0}</p>
            <p style={style.p}>Ngày tạo: {new Date(pond.date).toLocaleDateString()}</p>
            <p style={style.p}>Kích thước: {pond.size}m</p>
            <p style={style.p}>Độ sâu: {pond.depth}m</p>
            <p style={style.p}>Thể tích: {pond.volume}l</p>
            <p style={style.p}>Số ống xả: {pond.drainCount} cái</p>
            <p style={style.p}>Lưu lượng máy bơm: {pond.pumpCapacity}w</p>
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