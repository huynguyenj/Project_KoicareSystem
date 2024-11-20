import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getFishHistory } from '../../api/pond_fish';
import { LineChart } from '@mui/x-charts/LineChart';
import { Button } from '@mui/material';

function FishDevelopmentData() {
    const { id } = useParams();
    const [fishHistory, setFishHistory] = useState([]);
    const [dataset, setDataset] = useState([]);
    const [date,setDate] = useState([])
    const navigator = useNavigate();
    useEffect(() => {
        getFishDevelopmentHistory();
    }, []);

    const getFishDevelopmentHistory = async () => {
        try {
            const res = await getFishHistory(id);
            if (res && res.result) {
                setFishHistory(res.result);
                processData(res.result);
                console.log(dataset)
                console.log(fishHistory)
            }
        } catch (error) {
            console.error("Error fetching fish history:", error);
        }
    };

    const processData = (data) => {
      const formattedData = data.map(item => {
          const weight = parseFloat(item.weight);
          const size = parseFloat(item.size);
          const date = new Date(item.date);
          return {
              date: date.toLocaleDateString(), // Check for valid date
              weight: isNaN(weight) ? 0 : weight,
              size: isNaN(size) ? 0 : size
          };
      });
      setDataset(formattedData);
     
      console.log("Formatted Dataset:", formattedData);
      console.log(date)
  };
  
      const handleChangePage = () =>{
            navigator("/userhome/myfishlist")
      }


    return (
        <div>
            <h3>Biểu Đồ Thống Kê Xu Hướng Phát Triển Cá Koi</h3>
            <LineChart
                width={600}
                height={400}
                dataset={dataset} // Providing dataset to LineChart
                xAxis={[
                    {
                        dataKey: 'date',
                        label: 'Date',
                        scaleType:"point",
                        
                    },
                ]}
               
                series={[
                    { dataKey: 'weight', color: '#8884d8', label: 'Cân nặng (kg)' },
                    { dataKey: 'size', color: '#82ca9d', label: 'Kích thước (cm)' },
                ]}
                
            />
            <Button variant='contained'>Quay lại danh sách cá</Button>
        </div>
    );
}

export default FishDevelopmentData;
