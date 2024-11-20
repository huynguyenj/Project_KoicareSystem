import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getFishInfo } from "../../api/pond_fish";
import { Card, Grid, TextField, Typography } from "@mui/material";

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
    <Grid container spacing={2}>
      <Grid item xs = {8}>
            <Typography>Thêm lịch sử </Typography>
      </Grid>
      <Grid item xs = {8}>
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
      </Grid>
  );
}

export default AddDevelopment;
