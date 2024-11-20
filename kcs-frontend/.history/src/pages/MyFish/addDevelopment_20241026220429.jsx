import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getFishInfo } from "../../api/pond_fish";
import { Card, Grid, TextField } from "@mui/material";

function addDevelopment() {
  const { id } = useParams();
  const [fish, setFish] = useState();
  const [formData, setFormData] = useState({
 
      size: "",
      fishAge: "",
      fishWeight: "",

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
      <Grid sm={12} xs={12}>
        <Card>
            <TextField
             fullWidth
             label="Tên của cá"
             name="fishName"
            >
                  
            </TextField>
        </Card>
      </Grid>
    </div>
  );
}

export default addDevelopment;
