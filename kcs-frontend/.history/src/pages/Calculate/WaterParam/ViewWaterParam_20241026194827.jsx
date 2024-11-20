import {
  Button,
  Card,
  CardContent,
  Typography,
  Divider,
  Alert,
  Grid,
  FormControl,
  CircularProgress,
  TextField
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Form, useParams } from "react-router-dom";
import { checkParam, getPondWaterParam } from "../../../api/pond_fish";
import { ToastContainer, toast } from "react-toastify";
function ViewWaterParam() {
  const { id } = useParams();
  const [waterParam, setWaterParam] = useState({});
  const [recomendation, setRecomendation] = useState({});
  const [update, setUpdate] = useState(false);
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState({});
  const [data, setData] = useState({
      measurementTime: "",
      temperature: "",
      salinity: "",
      ph: "",
      o2: "",
      no2: "",
      no3: "",
      po4: "",
    });
  useEffect(() => {
    getWaterParam();
    setData(
      {
            measurementTime: waterParam.measurementTime || "",
            temperature: waterParam.temperature || 0,
            salinity: waterParam.salinity || 0,
            ph: waterParam.ph || 0,
            o2: waterParam.o2 || 0,
            no2: waterParam.no2 || 0,
            no3: waterParam.no3 || 0,
            po4: waterParam.po4 || 0
      }
    )
  }, []);

 
  const validate = () =>{
      const newError = {}
      if(!data.measurementTime || data.measurementTime.trim() ==""){
            newError.time = "Thời gian không được để trống!"
      }   
      if(!data.temperature){
            newError.temp = "Nhiệt độ không được để trống!"
      }if(!data.ph|| data.ph < 0){
            newError.ph = "Độ pH không được để trống hoặc < 0"
      }
      if(!data.salinity|| data.salinity < 0){
            newError.salt = "Độ muối không được để trống hoặc < 0"
      }
      if(!data.o2 || data.o2 <= 0){
            newError.o2 = "Nồng độ oxi không được để trống hoặc <= 0"
      }if(!data.no2){
            newError.no2 = "Nồng độ NO2 không được để trống"
      }if(!data.no3){
            newError.no3 = "Nồng độ NO3 không được để trống"
      }if(!data.po4){
            newError.po4 = "Nồng độ PO4 không được để trống"
      }
      setError(newError)
      return Object.keys(newError).length===0;

  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) =>{
      e.preventDefault();
      console.log(data)
      if(validate()){
            setLoading(true)
      try {
            // await addWaterParam(pondId,data)
            toast.success("Thêm thông số nước thành công")
      } catch (error) {
           console.log(error)
           toast.error("Thêm thông số nước thất bại!") 
      } finally{
            setLoading(false)
      }
      }

  }
  const getWaterParam = async () => {
    try {
      const data = await getPondWaterParam(id);
      setWaterParam(data.result);
      console.log(waterParam);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckParam = async () => {
    try {
      const recommend = await checkParam(id);
      setRecomendation(recommend.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeUpdate = ()=>{
      setUpdate(true)
  }
  return (
    <div>
      <Card
        sx={{ maxWidth: 700, margin: "auto", boxShadow: 3, borderRadius: 2 }}
      >
        <CardContent>
          <Typography
            variant="h4"
            sx={{
              backgroundColor: "green",
              color: "white",
              textAlign: "center",
              mb: 2,
              padding: 2,
              borderRadius: 1,
            }}
          >
            Thông số của hồ
          </Typography>

            { !update? 
            (<>
              <Typography
            variant="h5"
            sx={{ textAlign: "center", mb: 1, fontWeight: "bold" }}
          >
            {waterParam.pondName}
          </Typography>
          <Typography sx={{ textAlign: "center", color: "gray", mb: 2 }}>
            Ngày tạo:{" "}
            {new Date(waterParam.measurementTime).toLocaleDateString()}
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Typography>
            Nhiệt độ:{" "}
            <span style={{ color: "#ff7043" }}>{waterParam.temperature}°C</span>
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography>
            Độ mặn:{" "}
            <span style={{ color: "#29b6f6" }}>{waterParam.salinity}%</span>
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography>
            Độ pH: <span style={{ color: "#66bb6a" }}>{waterParam.ph}</span>
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography>
            Nồng độ O2:{" "}
            <span style={{ color: "#ef5350" }}>{waterParam.o2}mg/l</span>
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography>Nồng độ NO2: {waterParam.no2}mg/l</Typography>
          <Divider sx={{ my: 1 }} />
          <Typography>Nồng độ NO3: {waterParam.no3}mg/l</Typography>
          <Divider sx={{ my: 1 }} />
          <Typography>Nồng độ PO4: {waterParam.po4}mg/l</Typography>

          <Button
            onClick={handleCheckParam}
            variant="contained"
            color="primary"
            sx={{ mt: 3, width: "100%" }}
          >
            Kiểm tra lại thông số
          </Button>

          {!recomendation || Object.keys(recomendation).length === 0 ? (
            ""
          ) : (
            <Alert variant="filled" severity="warning" sx={{ mt: 2 }}>
              {Object.entries(recomendation).map(([key, value]) => (
                <Typography key={key}>
                  <strong>{key}</strong>: {value}
                </Typography>
              ))}
              <Button variant="contained" color="success" sx={{mt:2}} onClick={handleChangeUpdate}>
                Cập nhật lại thông số
              </Button>
            </Alert>
          )}
            </>)
            : 
            <>
                 <Form onSubmit={handleSubmit}>
            <Grid item xs={12} sm={9} container spacing={2}>
              <TextField
                fullWidth
                label="Thời gian đo"
                type="date"
                name="measurementTime"
                value={data.measurementTime}
                onChange={handleChange}
                sx={{ mb: 2 }}
                error ={!!error.time}
                helperText={error.time}
                InputLabelProps={{
                  shrink: true,
                }}
              ></TextField>

              <TextField
                fullWidth
                label="Nhiệt độ(°C)"
                type="number"
                name="temperature"
                value={data.temperature}
                onChange={handleChange}
                sx={{ mb: 2 }}
                error ={!!error.temp}
                helperText={error.temp}
              ></TextField>

              <FormControl>
                <TextField
                  fullWidth
                  label="Nồng độ muối"
                  type="number"
                  name="salinity"
                  value={data.salinity}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                  error ={!!error.salt}
                  helperText={error.salt}
                ></TextField>
              </FormControl>

              <FormControl>
                <TextField
                  fullWidth
                  label="Độ pH"
                  type="number"
                  name="ph"
                  value={data.ph}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                  error ={!!error.ph}
                  helperText={error.ph}
                ></TextField>
              </FormControl>

              <FormControl>
                <TextField
                  fullWidth
                  label="Nồng độ O2"
                  type="number"
                  name="o2"
                  value={data.o2}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                  error ={!!error.o2}
                  helperText={error.o2}
                ></TextField>
              </FormControl>

              <FormControl>
                <TextField
                  fullWidth
                  label="Nồng độ NO2"
                  type="number"
                  name="no2"
                  value={data.no2}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                  error ={!!error.no2}
                  helperText={error.no2}
                ></TextField>
              </FormControl>

              <FormControl>
                <TextField
                  fullWidth
                  label="Nồng độ NO3"
                  type="number"
                  name="no3"
                  value={data.no3}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                  error ={!!error.no3}
                  helperText={error.no3}
                ></TextField>
              </FormControl>

              <FormControl>
                <TextField
                  fullWidth
                  label="Nồng độ PO4"
                  type="number"
                  name="po4"
                  value={data.po4}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                  error ={!!error.po4}
                  helperText={error.po4}
                ></TextField>
              </FormControl>
            </Grid>
            <Button
              variant="contained"
              color="success"
              type="submit"
              disabled={loading}
            >
              {loading ? <CircularProgress color="inherit" /> : "Lưu"}
            </Button>
          </Form>
           
            </>
      }
        
        </CardContent>
      </Card>
    </div>
  );
}

export default ViewWaterParam;
