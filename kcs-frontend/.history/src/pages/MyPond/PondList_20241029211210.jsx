import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Button, CircularProgress, Grid, Typography, Card, CardContent, CardMedia, Container } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { deletePond, getAllPond } from "../../api/pond_fish";
import { ToastContainer, toast } from "react-toastify";
import WaterIcon from "@mui/icons-material/Water";
import Footer from "../../components/Footer/Footer1";
import ShowChartIcon from "@mui/icons-material/ShowChart";
function PondList() {
  const [ponds, setPonds] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  useEffect(() => {
    getPonds();
  }, [location]);

  const getPonds = async () => {
    try {
      const res = await getAllPond();
      setPonds(res.result);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load data!");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePond = async (pondId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this pond?");
    if (!confirmDelete) return;

    try {
      await deletePond(pondId);
      toast.success("Pond deleted successfully");
      getPonds();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete pond!");
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ marginTop: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6">Loading...</Typography>
      </Container>
    );
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} closeOnClick pauseOnHover draggable pauseOnFocusLoss />
      <Container sx={{ py: 1 }}>
        <Grid container spacing={3}>
          {ponds.length > 0 ? (
            ponds.map((pond) => (
              <Grid item xs={12} sm={6} md={4} key={pond.id}>
                <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
                  <CardMedia component="img" height="200" image={pond.pondImg} alt="Pond Image" sx={{ borderRadius: "4px 4px 0 0" }} />
                  <CardContent>
                    <Typography variant="h5" color="textPrimary" sx={{ fontWeight: 600, mb: 1 }}>
                      {pond.pondName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                      Số lượng cá: {pond.fishResponses.length > 0 ? pond.fishResponses.length : 0}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                      Ngày tạo: {new Date(pond.date).toLocaleDateString()}
                    </Typography>
                    <Grid container spacing={1} justifyContent="space-around">
                      <Grid item>
                      <Tooltip title = {"Thêm cá vào hồ"} arrow>
                        <Button component={Link} to={`/userhome/pondlist/pondinfo/${pond.pondId}`} color="primary">
                          <VisibilityIcon />
                        </Button>
                        </Tooltip>
                      </Grid>
                      <Grid item>
                        <Button color="error" onClick={() => handleDeletePond(pond.pondId)}>
                          <DeleteOutlineIcon />
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button component={Link} to={`/userhome/viewparam/${pond.pondId}`} color="info">
                          <WaterIcon />
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button component={Link} to={`/userhome/pondParam/${pond.pondId}`} color="info">
                        <ShowChartIcon />
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}>Không tìm thấy kết quả</Typography>
          )}
        </Grid>
      </Container>
    </>
  );
}

export default PondList;
