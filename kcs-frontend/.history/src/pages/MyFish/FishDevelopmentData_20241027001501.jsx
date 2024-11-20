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
                        type: 'category',
                    },
                ]}
                yAxis={[
                    {
                        label: 'Measurement (kg/cm)',
                        type: 'number',
                    },
                ]}
                series={[
                    { dataKey: 'weight', color: '#8884d8', label: 'Cân nặng (kg)' },
                    { dataKey: 'size', color: '#82ca9d', label: 'Kích thước (cm)' },
                ]}
            />
        </div>
    );
}

export default FishDevelopmentData;
