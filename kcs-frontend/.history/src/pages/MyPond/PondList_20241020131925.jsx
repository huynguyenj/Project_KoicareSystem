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
       
    );
}

export default PondList;