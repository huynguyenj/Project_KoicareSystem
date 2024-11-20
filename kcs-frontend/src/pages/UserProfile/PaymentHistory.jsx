import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  CircularProgress,
  Box,
  Alert,
  Chip,
  Pagination,
  Button,
  Select,
  MenuItem
} from "@mui/material";
import { BarChart } from "@mui/x-charts";
import PaymentIcon from "@mui/icons-material/Payment";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { getMyPayment } from "../../api/userService";

const PaymentHistoryPage = () => {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showChart, setShowChart] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);
  const [page, setPage] = useState(1);
  const limitPerPage = 6;

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const response = await getMyPayment();
        const transformedData = response.result.map((payment) => ({
          date: payment.date,
          quantity: payment.quantity,
          amount: payment.price * payment.quantity,
          userName: payment.userName,
          productName: payment.productName,
          phone: payment.phone,
          address: payment.address
        }));
        setPaymentHistory(transformedData);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch payment history");
        setLoading(false);
        console.error(error);
      }
    };

    fetchPaymentHistory();
  }, []);

  const handlePageChange = (e, value) => setPage(value);

  const toggleChartView = () => setShowChart((prev) => !prev);

  // Group payments by year and month
  const groupPaymentsByYearAndMonth = () => {
    const data = {};
    paymentHistory.forEach((payment) => {
      const date = new Date(payment.date);
      const year = date.getFullYear();
      const month = date.toLocaleString("vn-VN", { month: "short" });
      if (!data[year]) data[year] = {};
      data[year][month] = (data[year][month] || 0) + payment.amount;
    });
    return data;
  };

  const groupedData = groupPaymentsByYearAndMonth();
  const availableYears = Object.keys(groupedData);

  useEffect(() => {
    if (availableYears.length && !selectedYear) {
      setSelectedYear(Math.max(...availableYears));
    }
  }, [availableYears]);

  const chartData = selectedYear
    ? Object.entries(groupedData[selectedYear] || {}).map(([month, amount]) => ({
        month,
        amount
      }))
    : [];

  const sliceDataEachPage = paymentHistory.slice(
    (page - 1) * limitPerPage,
    page * limitPerPage
  );

  return (
    <Container maxWidth="md" sx={{ mt: 1 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h5" color="primary" gutterBottom>
          <PaymentIcon sx={{ verticalAlign: "bottom", mr: 1 }} /> Lịch sử mua hàng
        </Typography>
      </Box>

      <Box display="flex" justifyContent="center" mb={3}>
        <Button variant="contained" color="primary" onClick={toggleChartView}>
          {showChart ? "Xem bảng thống kê" : "Xem biểu đồ chi tiêu"}
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mt: 2, textAlign: "center" }}>
          {error}
        </Alert>
      ) : showChart ? (
        <Box mt={3} mb={5}>
          <Box display="flex" justifyContent="center" mb={2}>
            <Typography variant="h6" align="center" gutterBottom>
              Tổng tiền trong tháng năm {selectedYear}
            </Typography>
            <Select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              sx={{ ml: 2 }}
            >
              {availableYears.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <BarChart
            xAxis={[
              {
                data: chartData.map((data) => data.month),
                scaleType: "band"
              }
            ]}
            series={[
              {
                data: chartData.map((data) => data.amount),
                label: "Tiền (VND)"
              }
            ]}
            width={600}
            height={400}
            margin={{ top: 10, bottom: 30, left: 90, right: 80 }}
            color="primary"
          />
        </Box>
      ) : (
        <>
          <TableContainer component={Paper} elevation={3} sx={{ mt: 2, borderRadius: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="subtitle2" color="textSecondary">
                      Ngày
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" color="textSecondary">
                     Số lượng
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" color="textSecondary">
                      Tổng tiền
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" color="textSecondary">
                      Tên sản phẩm
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" color="textSecondary">
                      Tên người dùng
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" color="textSecondary">
                      Địa chỉ
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paymentHistory.length > 0 ? (
                  sliceDataEachPage.map((payment, index) => (
                    <TableRow key={index} hover>
                      <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                      <TableCell>{payment.quantity}</TableCell>
                  </TableCell>
                      <TableCell>
                        <Chip
                          label={`${payment.amount.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND"
                          })}`}
                          color="primary"
                          variant="outlined"
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{payment.productName}</TableCell>
                      <TableCell>{payment.userName}</TableCell>
                      <TableCell>{payment.address}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <Alert severity="info">Bạn chưa có giao dịch</Alert>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ mt: 2 }} display="flex" justifyContent="center">
            <Pagination
              count={Math.ceil(paymentHistory.length / limitPerPage)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default PaymentHistoryPage;
