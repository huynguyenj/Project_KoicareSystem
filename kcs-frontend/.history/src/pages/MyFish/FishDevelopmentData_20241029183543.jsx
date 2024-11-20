import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getFishHistory } from '../../api/pond_fish';
import { LineChart } from '@mui/x-charts/LineChart';
import { Button, Card, CardContent, CircularProgress, Typography, Box } from '@mui/material';

function FishDevelopmentData() {
    const { id } = useParams();
    const [fishHistory, setFishHistory] = useState([]);   const [dataset, setDataset] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigator = useNavigate();

    useEffect(() => {
        getFishDevelopmentHistory();
    }, []);

    const getFishDevelopmentHistory = async () => {
        setLoading(true); // Start loading
        try {
            const res = await getFishHistory(id);
            if (res && res.result) {
                setFishHistory(res.result);
                processData(res.result);
            }
        } catch (error) {
            console.error("Error fetching fish history:", error);
            setError("Failed to fetch fish history. Please try again later.");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const processData = (data) => {
        const formattedData = data.map(item => {
            const weight = parseFloat(item.weight);
            const size = parseFloat(item.size);
            const date = new Date(item.date);
            return {
                date: date.toLocaleDateString(), // Format date
                weight: isNaN(weight) ? 0 : weight,
                size: isNaN(size) ? 0 : size
            };
        });
        setDataset(formattedData);
    };

    const handleChangePage = () => {
        navigator("/userhome/myfishlist");
    };

    return (
        <Box sx={{ padding: 3, backgroundColor: '#f9f9f9',height:'auto' }}>
            <Card variant="outlined" sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        Biểu Đồ Thống Kê Xu Hướng Phát Triển Cá Koi
                    </Typography>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', margin: 2 }}>
                            <CircularProgress />
                        </Box>
                    ) : error ? (
                        <Typography color="error" variant="body1" sx={{ textAlign: 'center' }}>
                            {error}
                        </Typography>
                    ) : (
                        <>
                            <LineChart
                                width={600}
                                height={400}
                                dataset={dataset}
                                xAxis={[{ dataKey: 'date', label: 'Ngày', scaleType: "point" }]}
                                series={[
                                    { dataKey: 'weight', color: '#8884d8', label: 'Cân nặng (kg)' },
                                    { dataKey: 'size', color: '#82ca9d', label: 'Kích thước (cm)' },
                                ]}
                                tooltip={{ formatter: (value) => `${value} kg/cm` }} // Tooltips
                            />
                            <Box sx={{ textAlign: 'center', marginTop: 3 }}>
                                <Button variant="contained" color="primary" onClick={handleChangePage}>
                                    Quay lại danh sách cá
                                </Button>
                            </Box>
                        </>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}

export default FishDevelopmentData;
