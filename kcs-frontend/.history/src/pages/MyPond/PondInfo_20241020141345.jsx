import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import { ToastContainer, toast } from "react-toastify";
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

    // In a real application, you would fetch the pond details based on the id
    // For this example, we'll use dummy data
    const pond = {
        id,
        name: "Sample Pond",
        fishCount: 100,
        creationDate: "2021-01-01",
        image: "https://i.pinimg.com/564x/b3/28/99/b32899495cf5a8bc7e016644e46fffed.jpg",
        description: "This is a beautiful pond with crystal clear water and a variety of fish species.",
    };
    
    const [ponds,setPond] = useState();

    const location = useLocation();
    useEffect(()=>{

    },[location])

    const getPondInfo = async ()=>{
        try {
            await getPondInfo(id);
        } catch (error) {
            console.log(error)
            toast.error("")
        }
      

    }

    return (
        <div style={style.container}>
            <h2 style={style.h2}>{pond.name}</h2>
            <img src={pond.image} alt={pond.name} style={style.image} />
            <p style={style.p}>Number of fish: {pond.fishCount}</p>
            <p style={style.p}>Created on: {new Date(pond.creationDate).toLocaleDateString()}</p>
            <p style={style.p}>{pond.description}</p>
            <Button component={Link} to="/userhome/pondlist" variant="contained" color="primary" style={style.button}>
                Back to Pond List
            </Button>
        </div>
    );
}

export default PondDetails;