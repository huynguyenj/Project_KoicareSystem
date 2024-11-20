import React, { useState, useEffect } from 'react';
import { getAllFish } from '../../api/pond_fish';
import {
  Typography,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Box,
} from '@mui/material';

function CalculationFood() {
  const [selectedFish, setSelectedFish] = useState({ fishName: '', fishWeight: 0 });
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [koiFishes, setKoiFishes] = useState([]);

  useEffect(() => {
    getFoiFishList();
  }, []);

  const getFoiFishList = async () => {
    try {
      const res = await getAllFish();
      setKoiFishes(res.result);
    } catch (error) {
      console.log(error);
    }
  };

  const isSeason = (date) => {
    const month = new Date(date).getMonth() + 1;
    if (month >= 1 && month <= 3) return 'Xuân';
    if (month >= 4 && month <= 6) return 'Hạ';
    if (month >= 7 && month <= 9) return 'Thu';
    if (month >= 10 && month <= 12) return 'Đông';
  };

  const isSummerSeason = (date) => {
    const month = new Date(date).getMonth() + 1;
    return month >= 4 && month <= 6;
  };

  const calculateFeedingAmount = (weight, age, date) => {
    let feedingPercentage;
    
    if (isSummerSeason(date)) {
      if (age < 1) {
        feedingPercentage = 0.05;  // 5% for young koi
      } else if (age >= 1 && age <= 3) {
        feedingPercentage = 0.03;  // 3% for juvenile koi
      } else {
        feedingPercentage = 0.02;  // 2% for adult koi
      }
    } else {
      if (age < 1) {
        feedingPercentage = 0.025; // 2.5% in colder months
      } else if (age >= 1 && age <= 3) {
        feedingPercentage = 0.015; // 1.5% for juveniles
      } else {
        feedingPercentage = 0.01;  // 1% for adults
      }
    }
  
    return weight * feedingPercentage;
  };
  
  

  const handleFishSelect = (id) => {
    const fish = koiFishes.find((f) => f.fishId === parseInt(id, 10));
    if (fish) {
      setSelectedFish(fish);
    }
    
  };

  const feedingAmount = calculateFeedingAmount(selectedFish.fishWeight, date,selectedFish.Age);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ maxWidth: '600px', margin: 'auto', padding: 3,mt:5 }}
    >
      <Paper elevation={3} sx={{ padding: 3, width: '100%' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Tính thức ăn cho cá
        </Typography>
        
        <FormControl fullWidth margin="normal">
          <InputLabel>Lựa chọn cá</InputLabel>
          <Select
            value={selectedFish.fishId || ''}
            onChange={(e) => handleFishSelect(e.target.value)}
            label="Lựa chọn cá"
          >
            <MenuItem value="">
              <em>Lựa chọn cá</em>
            </MenuItem>
            {koiFishes.map((fish) => (
              <MenuItem key={fish.fishId} value={fish.fishId}>
                {fish.fishName} - {fish.fishWeight}g
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Chọn ngày"
          type="date"
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        {selectedFish.fishId && (
          <Box mt={1} p={2} bgcolor="lightBlue" borderRadius={2}>
            <Typography variant="h6">Kết quả:</Typography>
            <Typography>Tên: {selectedFish.fishName}</Typography>
            <Typography>Khối lượng: {selectedFish.fishWeight}g</Typography>
            <Typography>Mùa: {isSeason(date || new Date())}</Typography>
            <Typography>Tuổi: {selectedFish.fishAge}</Typography>
            <Typography>
              Tỉ lệ thức ăn theo mùa: {isSummerSeason(date) ? '3%' : '2%'}
            </Typography>
            <Typography variant="h6" color="primary">
              Lượng thức ăn mỗi ngày: {feedingAmount.toFixed(1)}g
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default CalculationFood;
