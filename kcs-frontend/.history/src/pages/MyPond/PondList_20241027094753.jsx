
import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Button, CircularProgress, Grid, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { deletePond, getAllPond } from "../../api/pond_fish";
import { ToastContainer, toast } from "react-toastify";
import { Container } from "react-bootstrap";
import WaterIcon from '@mui/icons-material/Water';


function PondList() {
  const [ponds, setPonds] = useState([]);
  const style = {
    pondList: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
      gap: "20px",
      fontSize: "17px",
      fontFamily: "Arial, sansSerif",
      margin: "0",
      padding: "20px",
      backgroundColor: "#f0f0f0",
    },
    pondItem: {
      backgroundColor: "white",
      borderRadius: "8px",
      padding: "20px",
      boxShadow: "0 2px 4px rgba(1, 2, 2, 4)",
    },
    p: {
      margin: "5px 0",
      color: "#34495e",
    },
    h2: {
      marginTop: "0",
      color: "#2c3e50",
      fontSize: "25px",
    },
    image: {
      width: "100%",
      height: "400px",
      objectFit: "cover",
      borderRadius: "4px",
      marginBottom: "10px",
    },
  };

  const location = useLocation()
  useEffect(() => {
    getPonds();
  }, [location]);

  const getPonds = async () => {
    try {
      const res = await getAllPond();
      setPonds(res.result);
    } catch (error) {
      console.log(error)
      toast.error("Lấy dữ liệu thất bại!")
    }finally {
      setLoading(false); // Set loading to false after fetching
  }
    
  };
  const [loading, setLoading] = useState(true); // Loading state
  const handleDeletePond = async (pondId) => {
    try {
      const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa hồ này?");

      if (!confirmDelete) {
        return;
      }
      console.log(pondId)
      await deletePond(pondId);
      toast.success("Xóa hồ thành công");
      getPonds();
    } catch (error) {
      console.log(error);
      toast.error("Xóa hồ thất bại!");
    }
  };
  if (loading) {
    return (
        <Container maxWidth="md" sx={{ marginTop: 4, textAlign: 'center'}}>
            <CircularProgress />
            <Typography variant="h6">Đang tải...</Typography>
        </Container>
    );
}
if (!ponds) {
    return (
        <Container maxWidth="md" sx={{ marginTop: 4, textAlign: 'center' }}>
            <Typography variant="h6">Không tìm thấy dữ liệu</Typography>
        </Container>
    );
}
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
      <div style={style.pondList}>
        {ponds.length > 0? (ponds.map((pond) => (
          <div key={pond.id} style={style.pondItem}>
            <Grid container columnSpacing={0} columnGap={0}>
              <Grid item xs={12} sm={8}>
                <h2 style={style.h2}>{pond.pondName}</h2>
              </Grid>
              <Grid item xs={12} sm={4} container spacing={8}>
                <Grid item xs={6} sm={2}>
                  <Button
                    component={Link}
                    to={`/userhome/pondlist/pondinfo/${pond.pondId}`}
                    className="btn btn-light"
                    style={{ justifyContent: "center" }}
                  >
                    <VisibilityIcon style={{ color: "#000000" }} />
                  </Button>
                </Grid>
                <Grid item xs={6} sm={2}>
                  <Button
                    className="btn btn-light"
                    style={{ justifyContent: "center" }}
                    onClick={() => handleDeletePond(pond.pondId)}
                  >
                    <DeleteOutlineIcon style={{ color: "#000000" }} />
                  </Button>
                </Grid>
                <Grid item xs={6} sm={2}>
                <Button
                    component={Link}
                    to={`/userhome/viewparam/${pond.pondId}`}
                    className="btn btn-light"
                    style={{ justifyContent: "center" }}
                  >
                    <WaterIcon style={{ color: "#000000" }} />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              style={{
                display: "flex",
                flexDirection: "column",
                flexGrow: "1",
                padding: "2px",
              }}
            >
              <img src={pond.pondImg} alt="Pond Image" style={style.image} />
              <p style={style.p}>Number of fish: {pond.fishResponses.length > 0? pond.fishResponses.length : 0}</p>
              <p style={style.p}>
                Created on: {new Date(pond.date).toLocaleDateString()}
              </p>
            </Grid>
          </div>
        )))
        :  <Typography variant="h6" sx={{textAlign:'center'}}>Không tìm thấy kết quả</Typography>}
      </div>
      <F
    </>
  );
}

export default PondList;
