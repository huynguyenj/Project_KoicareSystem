import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getFishInfo } from "../../api/pond_fish";
import { Card, Grid, TextField } from "@mui/material";

function AddDevelopment() {
  const { id } = useParams();
  const [fish, setFish] = useState();
  const [formData, setFormData] = useState({
      size: "",
      age: "",
      weight: "",
      date:""
    });
  
  const getFish = async () => {
    try {
      const res = await getFishInfo(id);
      setFish(res.result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Grid sm={6} xs={12}>
            
      </Grid>
      <Grid sm={6} xs={12}>
        <Card sx={{ padding: 3, boxShadow: 6 }}>
            <Grid xs={12} sm={6}>
            <TextField
             fullWidth
             label="Kích thước cá"
             name="size"
            >
                  
            </TextField>
            </Grid>
           
        </Card>
      </Grid>
    </div>
  );
}

export default AddDevelopment;
