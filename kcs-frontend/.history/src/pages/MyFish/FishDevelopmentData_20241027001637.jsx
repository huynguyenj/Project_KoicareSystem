import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFishHistory } from '../../api/pond_fish';
import { LineChart } from '@mui/x-charts/LineChart';

function FishDevelopmentData() {
    const { id } = useParams();
    const [fishHistory, setFishHistory] = useState([]);
    const [dataset, setDataset] = useState([]);

    useEffect(() => {
        getFishDevelopmentHistory();
    }, []);

    const getFishDevelopmentHistory = async () => {
        try {
            const res = await getFishHistory(id);
            if (res && res.result) {
                setFishHistory(res.result);
                processData(res.result);
            }
        } catch (error) {
            console.error("Error fetching fish history:", error);
        }
    };

    const processData = (data) => {
        const formattedData = data.map(item => ({
            date: new Date(item.date).toLocaleDateString(),
            weight: item.weight,
            size: item.size
        }));
        setDataset(formattedData);
    };

    return (
      <LineChart
      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
      series={[
        {
          data: [2, 5.5, 2, 8.5, 1.5, 5],
          area: true,
        },
      ]}
      width={500}
      height={300}
    />
    );
}

export default FishDevelopmentData;
