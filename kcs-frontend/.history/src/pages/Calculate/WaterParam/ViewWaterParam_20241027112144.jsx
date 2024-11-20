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
import { Form, useNavigate, useParams } from "react-router-dom";
import { checkParam, getPondWaterParam, updateWaterParam } from "../../../api/pond_fish";
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
      temperature: 0,
      salinity: 0,
      ph: 0,
      o2: 0,
      no2: 0,
      no3: 0,
      po4: 0,
    });

  useEffect(() => {
    getWaterParam();
  }, []);

  useEffect(() => {
      if (waterParam.measurementTime) {
            setData({
                measurementTime: new Date(waterParam.measurementTime).toISOString().split("T")[0],
                temperature: waterParam.temperature || 0,
                salinity: waterParam.salinity || 0,
                ph: waterParam.ph || 0,
                o2: waterParam.o2 || 0,
                no2: waterParam.no2 || 0,
                no3: waterParam.no3 || 0,
                po4: waterParam.po4 || 0,
            });
        }
  }, [waterParam]);

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
      }if(data.no2 < 0){
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
            await updateWaterParam(id,data)
            toast.success("Cập nhật thông số nước thành công")
            setUpdate(false)
            getWaterParam();
            handleCheckParam();
      } catch (error) {
           console.log(error)
           toast.error("Cập nhật thông số nước thất bại!") 
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
  const naviagtor = useNavigate();
  const changeToPondPage = ()=>{
      naviagtor("/userhome/pondlist")
  }

  const handleChangeUpdate = ()=>{
      setUpdate(true)
  }
  return (
    <div>
      <ToastContainer/>
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

           {waterParam ? (<></>):
           (<Typography></Typography>)} 
           
        
        </CardContent>
      </Card>
    </div>
  );
}

export default ViewWaterParam;
