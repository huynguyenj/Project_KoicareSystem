import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Grid,
  Box,
  Container,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [amount, setAmount] = useState("");
  const [ipAddr, setIpAddr] = useState("");
  const [paymentUrl, setPaymentUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("/payment/create", { amount, ipAddr });
      setPaymentUrl(response.data.result);
    } catch (err) {
      setError("Error creating payment");
      console.error(err);
    }
  };

  return ( 
    <Container>
      <Typography variant="h4" gutterBottom className="text-center mt-5">
        Create Payment
      </Typography>

      <Box component="form" onSubmit={handleSubmit} className="mt-3">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} className="mb-3">
            <TextField
              required
              fullWidth
              id="amount"
              label="Amount"
              variant="outlined"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={6} className="mb-3">
            <TextField
              required
              fullWidth
              id="ipAddr"
              label="IP Address"
              variant="outlined"
              value={ipAddr}
              onChange={(e) => setIpAddr(e.target.value)}
            />
          </Grid>
        </Grid>

        <Box textAlign="center" className="mt-4">
          <Button variant="contained" color="primary" type="submit">
            Create Payment
          </Button>
        </Box>
      </Box>

      {paymentUrl && (
        <Box className="mt-5 text-center">
          <Typography variant="h6">Payment URL:</Typography>
          <a href={paymentUrl} target="_blank" rel="noopener noreferrer">
            {paymentUrl}
          </a>
        </Box>
      )}

      {error && (
        <Box className="mt-5 text-center text-danger">
          <Typography variant="body1">{error}</Typography>
        </Box>
      )}
    </Container>
  );
};

export default Payment;
