import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFishHistory } from '../../api/pond_fish';
import { LineChart } from '@mui/x-charts/LineChart';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

function FishDevelopmentData() {
    const { id } = useParams();
    const [fishHistory, setFishHistory] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filterType, setFilterType] = useState('year'); // 'year' or 'month'
    const [selectedYear, setSelectedYear] = useState(null);
    const [years, setYears] = useState([]);

    useEffect(() => {
        getFishDevelopmentHistory();
    }, []);

    const getFishDevelopmentHistory = async () => {
        try {
            const res = await getFishHistory(id);
            setFishHistory(res.result);
            extractYears(res.result); // Extract years for the filter
        } catch (error) {
            console.log(error);
        }
    };

    const extractYears = (data) => {
        const yearsList = [...new Set(data.map(item => new Date(item.date).getFullYear()))];
        setYears(yearsList);
    };

    // Filter data based on year or month
    useEffect(() => {
        if (filterType === 'year' && selectedYear) {
            const dataForYear = fishHistory.filter(item =>
                new Date(item.date).getFullYear() === selectedYear
            );
            setFilteredData(dataForYear);
        } else {
            setFilteredData(fishHistory);
        }
    }, [filterType, selectedYear, fishHistory]);

    return (
        <div>
            <FormControl sx={{ mb: 2, minWidth: 120 }}>
                <InputLabel>Filter By</InputLabel>
                <Select
                    value={filterType}
                    label="Filter By"
                    onChange={(e) => setFilterType(e.target.value)}
                >
                    <MenuItem value="year">Year</MenuItem>
                    <MenuItem value="month">Month</MenuItem>
                </Select>
            </FormControl>

            {filterType === 'year' && (
                <FormControl sx={{ mb: 2, minWidth: 120, ml: 2 }}>
                    <InputLabel>Year</InputLabel>
                    <Select
                        value={selectedYear || ''}
                        label="Year"
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                    >
                        {years.map(year => (
                            <MenuItem key={year} value={year}>{year}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}

            {filteredData.length > 0 ? (
                <LineChart
                    series={[
                        { label: 'Size (cm)', data: filteredData.map(item => ({ x: new Date(item.date), y: item.size })) },
                        { label: 'Weight (kg)', data: filteredData.map(item => ({ x: new Date(item.date), y: item.weight })) },
                    ]}
                    xAxis={[
                        {
                            type: 'time',
                            title: 'Date',
                            data: filteredData.map(item => new Date(item.date)),
                            labelFormatter: (value) => new Date(value).toLocaleDateString(),
                        }
                    ]}
                    yAxis={[
                        {
                            title: 'Value',
                            labelFormatter: (value) => value.toFixed(1),
                        }
                    ]}
                    width={700}
                    height={400}
                />
            ) : (
                <p>No data available for this selection.</p>
            )}
        </div>
    );
}

export default FishDevelopmentData;
