import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getFishInfo } from "../../api/pond_fish";
import { Card, Grid, TextField } from "@mui/material";

function addDevelopment() {
  const { id } = useParams();
  const [fish, setFish] = useState();
  const [age, setAge] = useState(0);
  const [size, setSize] = useState(0);
  const [weight, setWeight] = useState(0);
  const [date, setDate] = useState("");
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
            <TextField>
            fullWidth
                      label="Tên của cá"
                      name="fishName"
            </TextField>
        </Card>
      </Grid>
    </div>
  );
}

export default addDevelopment;
