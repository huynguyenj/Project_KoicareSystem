import {
  Button,
  Card,
  CardContent,
  Typography,
  Divider,
  Alert,
  Grid,
  FormControl
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { checkParam, getPondWaterParam } from "../../../api/pond_fish";

function ViewWaterParam() {
  const { id } = useParams();
  const [waterParam, setWaterParam] = useState({});
  const [recomendation, setRecomendation] = useState({});
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    getWaterParam();
  }, []);

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
              <Button variant="contained" color="success" sx={{mt:2}}>
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
              disabled={update}
            >
              {update ? <CircularProgres color="inherit" /> : "Lưu"}
            </Button>
          </Form>
          <Grid>
            <Button variant="contained" sx={{mt:2,width:'100%'}}>Xem thông số nước</Button>
          </Grid> 
            </>
      }
        
        </CardContent>
      </Card>
    </div>
  );
}

export default ViewWaterParam;
