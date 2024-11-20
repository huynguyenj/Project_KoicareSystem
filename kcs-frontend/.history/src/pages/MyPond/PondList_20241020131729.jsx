import React, { useEffect, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { deletePond, getAllPond } from '../../api/pond_fish';
import { toast } from 'react-toastify';





function PondList() {
   
    const[ponds,setPonds] = useState([]);
    const style = {
        pondList: {
            display: "grid",
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '20px',
            fontSize: '17px',
            fontFamily: 'Arial, sansSerif',
            margin: '0',
            padding: '20px',
            backgroundColor: '#f0f0f0'
        },
        pondItem: {
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 2px 4px rgba(1, 2, 2, 4)',
        },
        p: {
            margin: '5px 0',
            color: '#34495e'
        },
        h2: {
            marginTop: '0',
            color: '#2c3e50',
            fontSize: '25px'
        },
        image: {
            width: '100%', height: '200px', objectFit: 'contain', borderRadius: '4px', marginBottom: '10px'
        }
    };
    
 

    
    useEffect(()=>{
      getPonds();
    },[])

    const getPonds = async()=>{
        getAllPond().then((res)=>setPonds(res.result))
    }

    const handleDeltePond = async(pondId)=>{
         const deleteToast = toast(
        <div>
            <p>Bạn có chắc chắn muốn xóa hồ này?</p>
            <button onClick={async () => {
                try {
                    await deletePond(pondId);
                    toast.success("Xóa hồ thành công");
                    toast.dismiss(deleteToast); // Dismiss the confirmation toast
                } catch (error) {
                    console.log(error);
                    toast.error("Xóa hồ thất bại!");
                }
            }}>Đồng ý</button>
            <button onClick={() => toast.dismiss(deleteToast)}>Hủy</button>
        </div>, {
            autoClose: false, // Prevent it from closing automatically
        }
    );
        
    }
    return (
<>
</>
        <div style={style.pondList}>
            {ponds.map((pond) => (
                <div key={pond.id} style={style.pondItem}>
                    <Grid container columnSpacing={0} columnGap={0}>
                        <Grid item xs={12} sm={8}><h2 style={style.h2}>{pond.pondName}</h2></Grid>
                        <Grid item xs={12} sm={4} container spacing={8}>
                            <Grid item xs={6} sm={2}>
                                <Button component={Link} to={`/userhome/pondlist/pondinfo/${pond.pondId}`} className="btn btn-light" style={{ justifyContent: 'center' }} >
                                    <VisibilityIcon style={{ color: '#000000' }} />
                                </Button>
                            </Grid>
                            <Grid item xs={6} sm={2}>
                                <Button className="btn btn-light" style={{ justifyContent: 'center' }}
                                    onClick={() => handleDeltePond(pond.pondId)} >
                                    <DeleteOutlineIcon style={{ color: '#000000' }} />
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid style={{ display: 'flex', flexDirection: 'column', flexGrow: '1', padding: '2px' }}>
                        <img src={pond.pondImg} alt="Pond Image" style={style.image} />
                        <p style={style.p}>Number of fish: {pond.fishResponses}</p>
                        <p style={style.p}>Created on: {new Date(pond.date).toLocaleDateString()}</p>
                    </Grid>

                </div>
            ))}
        </div>
    );
}

export default PondList;