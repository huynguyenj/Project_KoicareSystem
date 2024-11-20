import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFishHistory } from '../../api/pond_fish';
import { LineChart } from '@mui/x-charts/LineChart';

function FishDevelopmentData() {
    const { id } = useParams();
    const [fishHistory, setFishHistory] = useState([]);
    const [weightData, setWeightData] = useState([]);
    const [sizeData, setSizeData] = useState([]);
    const [dates, setDates] = useState([]);

    useEffect(() => {
        getFishDevelopmentHistory();
    }, []);

    useEffect(() => {
        if (fishHistory.length > 0) {
            // Extracting weight, size, and dates once fishHistory is updated
            filterData();
        }
    }, [fishHistory]);

    const getFishDevelopmentHistory = async () => {
        try {
            const res = await getFishHistory(id);
            if (res && res.result) {
                setFishHistory(res.result);
            } else {
                console.warn("Data not found or malformed", res);
                setFishHistory([]);
            }
        } catch (error) {
            console.error("Error fetching fish history:", error);
        }
    };

    const filterData = () => {
        const weights = fishHistory.map(fish => fish.weight);
        const sizes = fishHistory.map(fish => fish.size);
        const dateLabels = fishHistory.map(fish => new Date(fish.date).toLocaleDateString());

        setWeightData(weights);
        setSizeData(sizes);
        setDates(dateLabels);
    };

    return (
        <div>
            <h3>Biểu Đồ Thống Kê Xu Hướng Phát Triển Cá Koi</h3>
            <LineChart
                width={600}
                height={400}
                data={[
                    { id: 'Weight', data: weightData.map((w, index) => ({ x: dates[index], y: w })) },
                    { id: 'Size', data: sizeData.map((s, index) => ({ x: dates[index], y: s })) },
                ]}
                xAxis={{
                    dataKey: 'x',
                    label: 'Date',
                    type: 'category', // Ensure the xAxis is categorized by dates
                }}
                yAxis={{
                    label: 'Measurement (kg/cm)',
                    type: 'number', // Ensures yAxis accepts numeric values
                }}
                series={[
                    { id: 'Weight', color: '#8884d8', label: 'Cân nặng (kg)' },
                    { id: 'Size', color: '#82ca9d', label: 'Kích thước (cm)' }
                ]}
            />
        </div>
    );
}

export default FishDevelopmentData;
