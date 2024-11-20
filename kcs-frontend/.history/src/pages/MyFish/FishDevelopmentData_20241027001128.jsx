import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFishHistory } from '../../api/pond_fish';
import { LineChart} from '@mui/x-charts/LineChart';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function FishDevelopmentData() {
    const { id } = useParams();
    const [fishHistory, setFishHistory] = useState([]);
    const [weight, setWeight] = useState([]);
    const [size, setSize] = useState([]);
    const [dates, setDates] = useState([]); // Array to hold dates for x-axis

    useEffect(() => {
        getFishDevelopmentHistory();
    }, []);

    useEffect(() => {
        // Extract weights, sizes, and dates when fishHistory updates
        filterData();
    }, [fishHistory]);

    const getFishDevelopmentHistory = async () => {
        try {
            const res = await getFishHistory(id);
            setFishHistory(res.result);
        } catch (error) {
            console.log(error);
        }
    };

    const filterData = () => {
        const weights = fishHistory.map(fish => fish.weight);
        const sizes = fishHistory.map(fish => fish.size);
        const dateLabels = fishHistory.map(fish => new Date(fish.date).toLocaleDateString());

        setWeight(weights);
        setSize(sizes);
        setDates(dateLabels);
    };

    return (
        <div>
            <h3>Biểu Đồ Thống Kê Xu Hướng Phát Triển Cá Koi</h3>
            <LineChart
                width={600}
                height={400}
                data={[
                    { id: 'Weight', data: weight.map((w, index) => ({ x: dates[index], y: w })) },
                    { id: 'Size', data: size.map((s, index) => ({ x: dates[index], y: s })) },
                ]}
                xAxis={{
                    dataKey: 'x',
                    label: 'Date',
                }}
                yAxis={{
                    label: 'Measurement (kg/cm)',
                }}
            >
                <Line dataKey="y" seriesKey="Weight" stroke="#8884d8" dot={false} name="Cân nặng (kg)" />
                <Line dataKey="y" seriesKey="Size" stroke="#82ca9d" dot={false} name="Kích thước (cm)" />
            </LineChart>
        </div>
    );
}

export default FishDevelopmentData;
