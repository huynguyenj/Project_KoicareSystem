import {
  Button,
  Card,
  CardContent,
  Typography,
  Divider,
  Alert,
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

            { update? 
            
      }
          
        </CardContent>
      </Card>
    </div>
  );
}

export default ViewWaterParam;
