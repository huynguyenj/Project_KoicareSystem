import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import { ToastContainer, toast } from "react-toastify";
import { getPond } from '../../api/pond_fish';
const style = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f0f0f0',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        
    },
    image: {
        width: '100%',
        height: '400px',
        objectFit: 'cover',
        borderRadius: '8px',
        marginBottom: '20px',
    },
    h2: {
        color: '#2c3e50',
        marginBottom: '10px',
        textAlign: 'center'
    },
    p: {
        color: '#34495e',
        marginBottom: '10px',
    },
    button: {
        marginTop: '20px',
    },
};

function PondDetails() {
    const { id } = useParams();
    
    const [pond,setPond] = useState({});

    const location = useLocation();
    useEffect(()=>{
        getPondInfo();
    },[location])

    const getPondInfo = async ()=>{
        try {
            const res = await getPond(id);
            setPond(res.result)
        } catch (error) {
            console.log(error)
            toast.error("Xảy ra lỗi trong quá trình lấy dữ liệu!");
        }
      
    }

    return (
        <>
        <ToastContainer/>
        <div style={style.container}>
            <h2 style={style.h2}>{pond.pondName}</h2>
            <img src={pond.pondImg} alt="Pond img" style={style.image} />
            <div>
            <p style={style.p}>Number of fish: {pond.fishResponses}</p>
            <p style={style.p}>Created on: {new Date(pond.date).toLocaleDateString()}</p>
            <p style={style.p}>Kích thước: {pond.size}m</p>
            <p style={style.p}>Độ sâu: {pond.depth}m</p>
            <p style={style.p}>Thể tích: {pond.volume}l</p>
            <p style={style.p}>Số ống xả: {pond.drainCount}</p>
            <p style={style.p}>Lưu lượng máy bơm: {pond.pumpCapacity}</p>
            </div>
            <Button component={Link} to="/userhome/pondlist" variant="contained" color="primary" style={style.button}>
                Back to Pond List
            </Button>
        </div>
        </>
        
    );
}

export default PondDetails;