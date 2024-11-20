import React, { useEffect, useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { getAllPond } from '../../api/pond_fish';





function PondList() {
    const pondList = [
        {
            id: '1',
            name: "Crystal Lake",
            fishCount: 150,
            creationDate: "2020-05-15",
            image: "https://i.pinimg.com/564x/b3/28/99/b32899495cf5a8bc7e016644e46fffed.jpg"
        },
        {
            id: '2',
            name: "Sunset Pond",
            fishCount: 75,
            creationDate: "2019-08-22",
            image: "https://i.pinimg.com/564x/b3/28/99/b32899495cf5a8bc7e016644e46fffed.jpg"
        },
        {
            id: '3',
            name: "Meadow Waters",
            fishCount: 200,
            creationDate: "2021-03-10",
            image: "https://i.pinimg.com/564x/b3/28/99/b32899495cf5a8bc7e016644e46fffed.jpg"
        },
        {
            id: '4',
            name: "Tranquil Oasis",
            fishCount: 120,
            creationDate: "2018-11-30",
            image: "https://i.pinimg.com/564x/b3/28/99/b32899495cf5a8bc7e016644e46fffed.jpg"
        },
        {
            id: '5',
            name: "Whispering Willows",
            fishCount: 180,
            creationDate: "2022-02-14",
            image: "https://i.pinimg.com/564x/b3/28/99/b32899495cf5a8bc7e016644e46fffed.jpg"
        },
        {
            id: '6',
            name: "Serene Springs",
            fishCount: 95,
            creationDate: "2020-09-01",
            image: "https://i.pinimg.com/564x/b3/28/99/b32899495cf5a8bc7e016644e46fffed.jpg"
        },
        {
            id: '7',
            name: "Misty Shores",
            fishCount: 220,
            creationDate: "2019-04-18",
            image: "https://i.pinimg.com/564x/b3/28/99/b32899495cf5a8bc7e016644e46fffed.jpg"
        },
        {
            id: '8',
            name: "Mysterious Lake",
            fishCount: 220,
            creationDate: "2019-04-18",
            image: "https://i.pinimg.com/564x/b3/28/99/b32899495cf5a8bc7e016644e46fffed.jpg"
        }
    ];
    
    const[pondss,setPondss] = useState([]);
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
            width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px', marginBottom: '10px'
        }
    };
    
    const [ponds, setPonds] = useState(pondList);

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this pond?")) {
            setPonds(ponds.filter(pond => pond.id !== id));
        }
    }
    
    useEffect(()=>{
      getPonds();
    },[])

    const getPonds = async()=>{
        getAllPond().then((res)=>setPondss(res.result))
    }
    return (

        <div style={style.pondList}>
            {ponds.map((ponds) => (
                <div key={pond.id} style={style.pondItem}>
                    <Grid container columnSpacing={0} columnGap={0}>
                        <Grid item xs={12} sm={8}><h2 style={style.h2}>{pond.name}</h2></Grid>
                        <Grid item xs={12} sm={4} container spacing={8}>
                            <Grid item xs={6} sm={2}>
                                <Button component={Link} to={`/userhome/pondlist/pondinfo/${pond.id}`} className="btn btn-light" style={{ justifyContent: 'center' }} >
                                    <VisibilityIcon style={{ color: '#000000' }} />
                                </Button>
                            </Grid>
                            <Grid item xs={6} sm={2}>
                                <Button className="btn btn-light" style={{ justifyContent: 'center' }}
                                    onClick={() => handleDelete(pond.id)} >
                                    <DeleteOutlineIcon style={{ color: '#000000' }} />
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid style={{ display: 'flex', flexDirection: 'column', flexGrow: '1', padding: '2px' }}>
                        <img src={pond.image} alt={pond.name} style={style.image} />
                        <p style={style.p}>Number of fish: {pond.fishCount}</p>
                        <p style={style.p}>Created on: {new Date(pond.creationDate).toLocaleDateString()}</p>
                    </Grid>

                </div>
            ))}
        </div>
    );
}

export default PondList;