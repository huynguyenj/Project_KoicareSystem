import React from "react";
import { Box, Button, Grid, Typography, Card, CardMedia } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ListIcon from "@mui/icons-material/List";
import { Link } from "react-router-dom";

const PondSection = () => {
  return (
    <>
     <Box
      sx={{
        height: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        backgroundColor: "#fff", // Light background color
        paddingTop: "10px",
        marginBottom:"10px"
      }}
    >
      <Grid container spacing={2} alignItems="center">
        {/* Left side images */}
        <Grid item xs={12} md={3} sx={{ position: "relative" }}>
          <Box sx={{ position: "absolute", top: 20, left: 30 }}>
            <Box
              sx={{
                backgroundColor: "#212121",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: 15,
                transform: "translate(10px, 50px)",
              }}
            >
              <Card
                sx={{
                  boxShadow: 6, // Increased shadow effect
                  transform: "translate(-50px, -70px)",
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image="/Pond.png" // Replace with actual path
                  alt="Pond Image 1"
                  sx={{ borderRadius: 1, width: "150px" }}
                />
              </Card>
            </Box>
            <Box
              sx={{
                backgroundColor: "#212121",
                padding: "10px",
                paddingBottom: "0px",
                borderRadius: "8px",
                marginBottom: 3,
                transform: "translate(10px, 50px)",
              }}
            >
              <Card
                sx={{

                    transform: "translate(40px, -70px)",
                    boxShadow: 6,
                  
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image="/Pond2.png" // Replace with actual path
                  alt="Pond Image 2"
                  sx={{ borderRadius: 1, width: "150px" }}
                />
              </Card>
            </Box>
          </Box>
        </Grid>

        {/* Center Content */}
        <Grid item xs={12} md={6}
          sx={{marginTop: "80vh"}}
        >
          <Typography variant="h3" align="center">
            Hồ của tôi
          </Typography>
          <Typography
            variant="body1"
            align="center"
            sx={{ marginTop: 2, marginBottom: 4 }}
          >
            Đưa thiên nhiên vào ngôi nhà của bạn với những mẫu hồ cá độc đáo. Đó
            là giải pháp hoàn hảo cho không gian sống của bạn.
          </Typography>
          <Box sx={{ textAlign: "center" }}>
            <Button
              component={Link}
              to="/userhome/pondadd"
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              sx={{ marginRight: 2 }}
            >
              Thêm hồ cá
            </Button>
            <Button
            component={Link}
            to="/userhome/pondlist"
             variant="outlined" 
             startIcon={<ListIcon />}>
              Xem danh sách hồ
            </Button>
          </Box>
        </Grid>

        {/* Right side images */}
        <Grid item xs={12} md={3} sx={{ position: "relative" }}>
          <Box sx={{ position: "absolute", top: 50, right: 30 }}>
            <Box
              sx={{
                backgroundColor: "#212121",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: 15,
                transform: "translate(10px, 10px)"
              }}
            >
              <Card
                sx={{

                    transform: "translate(50px, 50px)",
                    boxShadow: 6,
                 
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image="/Pond3.png" // Replace with actual path
                  alt="Pond Image 3"
                  sx={{ borderRadius: 1, width: "150px" }}
                />
              </Card>
            </Box>
            <Box
              sx={{
                backgroundColor: "#212121",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: 2,
                transform: "translate(10px, 10px)"
              }}
            >
              <Card
                sx={{
       
                    transform: "translate(-50px, 40px)",
                    boxShadow: 6,
                  
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image="/Pond4.png" // Replace with actual path
                  alt="Pond Image 4"
                  sx={{ borderRadius: 1, width: "150px" }}
                />
              </Card>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
    </>
   
  );
};

export default PondSection;
