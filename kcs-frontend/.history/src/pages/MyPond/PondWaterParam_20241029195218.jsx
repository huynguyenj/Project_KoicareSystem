import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllHistory } from "../../api/payment";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { getWaterParamHistory } from "../../api/pond_fish";
import { LineChart } from "@mui/x-charts";

function PondWaterParam() {
  const { id } = useParams();
  const [paramHistory, setParamHistory] = useState([]);
  const navigator = useNavigate();
  useEffect(() => {
    getHistoryParam();
  }, []);
  const getHistoryParam = async () => {
    try {
      const res = await getWaterParamHistory(id);
      processData(res.result);
    } catch (error) {
      console.log(error);
    }
  };

  const processData = (data) => {
    const formData = data.map((h) => {
      const no2 = parseFloat(h.no2) || 0;
      const ph = parseFloat(h.ph) || 0;
      const o2 = parseFloat(h.o2) || 0;
      const no3 = parseFloat(h.no3) || 0;
      const po4 = parseFloat(h.po4) || 0;
      const salinity = parseFloat(h.salinity) || 0;
      const temperature = parseFloat(h.temperature) || 0;
      const date = new Date(h.measurementTime).toLocaleDateString();
      return {
        no2,
        ph,
        o2,
        no3,
        po4,
        salinity,
        temperature,
        date,
      };
    });
    setParamHistory(formData);
  };

  return (
    <div>
      <Box sx={{ padding: 2, backgroundColor: "#9fd3c7", height: "auto" }}>
        <Card
          variant="outlined"
          sx={{ maxWidth: 800, margin: "auto", padding: 1 }}
        >
          <CardContent>
            <Typography variant="h4" gutterBottom align="center">
              Thống kê thông số của hồ
            </Typography>
            {paramHistory ? (
              <>
              <Box s>
              <LineChart
                  width={600}
                  height={400}
                  dataset={paramHistory}
                  xAxis={[
                    { dataKey: "date", label: "Ngày", scaleType: "point" },
                  ]}
                  series={[
                    {
                      dataKey: "no2",
                      color: "#1976d2",
                      label: "NO2",
                      valueFormatter: (v) => (v == null ? "" : `${v} mg/l`),
                    },
                    {
                      dataKey: "o2",
                      color: "#212121",
                      label: "Oxi",
                      valueFormatter: (v) => (v == null ? "" : `${v} mg/l`),
                    },
                    // {dataKey:'ph', color:'#9fd3c7', label:'Nồng độ PH'},
                    {
                      dataKey: "no3",
                      color: "#82ca9d",
                      label: "NO3",
                      valueFormatter: (v) => (v == null ? "" : `${v} mg/l`),
                    },
                    {
                      dataKey: "po4",
                      color: "#142d4c",
                      label: "PO4",
                      valueFormatter: (v) => (v == null ? "" : `${v} mg/l`),
                    },
                    {
                      dataKey: "salinity",
                      color: "red",
                      label: "Độ mặn",
                      valueFormatter: (v) => (v == null ? "" : `${v} mg/l`),
                    },
                    // {dataKey:'temperature', color:'#f96d00', label:'Nhiệt độ hồ'}
                  ]}
                  sx={{ "& .MuiLegend-root": { marginTop: "20px" } }}
                  // tooltip={{ formatter: (value) => `${value} mg/l` }} // Tooltips
                />
              </Box>
               
                <Box sx={{ textAlign: "center", marginTop: 3 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigator("/userhome/pondlist")}
                  >
                    Quay lại danh sách cá
                  </Button>
                </Box>
              </>
            ) : (
              <Alert severity="info">Không có dữ liệu</Alert>
            )}
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

export default PondWaterParam;
