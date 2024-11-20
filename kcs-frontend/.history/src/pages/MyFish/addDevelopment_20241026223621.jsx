import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { addFishHistory, getFishInfo } from "../../api/pond_fish";
import { Card, Grid, TextField, Typography, Button } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddDevelopment() {
  const { id } = useParams();
  const [fish, setFish] = useState(null);
  const [formData, setFormData] = useState({
    size: "",
    age: "",
    weight: "",
    date: ""
  });

  useEffect(() => {
    getFish();
  }, []);

  const getFish = async () => {
    try {
      const res = await getFishInfo(id);
      setFish(res.result);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load fish information.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add your submission logic here, e.g., calling an API endpoint to save data
      console.log(formData);
      await addFishHistory()
      toast.success("Development history added successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add development history.");
    }
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <ToastContainer />
      <Grid item xs={12}>
        <Typography variant="h4" align="center">
          Add Development History for {fish ? fish.fishName : "Fish"}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Card sx={{ padding: 3, boxShadow: 6 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Size"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Age"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" fullWidth>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
}

export default AddDevelopment;
