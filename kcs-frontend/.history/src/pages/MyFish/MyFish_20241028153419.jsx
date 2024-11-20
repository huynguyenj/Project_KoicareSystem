import {
  Button,
  CardMedia,
  CircularProgress,
  Typography,
  Menu,
  MenuItem,
  Select,
  InputLabel,
  Modal,
  Box,
  FormControl,
  Container,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../../components/Footer/Footer1";
import AddIcon from "@mui/icons-material/Add";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import {
  addFishToPond,
  deleteFish,
  getAllFish,
  getAllPond,
} from "../../api/pond_fish";

function MyFishList() {
  const [koiFishList, setKoiFishList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ponds, setPonds] = useState([]);
  const [addToPondModal, setAddToPondModal] = useState(false);
  const [selectedFishId, setSelectedFishId] = useState(null);
  const [selectedPondId, setSelectedPondId] = useState("");

  useEffect(() => {
    getFishes();
    getPond();
  }, []);

  const getPond = async () => {
    try {
      const res = await getAllPond();
      setPonds(res.result);
    } catch (error) {
      console.log(error);
    }
  };

  const getFishes = async () => {
    try {
      const res = await getAllFish();
      setKoiFishList(res.result);
    } catch (error) {
      console.log(error);
      toast.error("Lấy dữ liệu thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFish = async (fishId) => {
    try {
      const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa con cá này?");
      if (!confirmDelete) return;
      await deleteFish(fishId);
      toast.success("Xóa thành công");
      getFishes();
    } catch (error) {
      console.log(error);
      toast.error("Xóa dữ liệu thất bại!");
    }
  };

  const handleOpenAddToPondModal = (fishId) => {
    setSelectedFishId(fishId);
    setAddToPondModal(true);
  };

  const handleCloseAddToPondModal = () => {
    setAddToPondModal(false);
    setSelectedFishId(null);
    setSelectedPondId("");
  };

  const handleAddFishToPond = async () => {
    if (!selectedPondId) {
      toast.error("Please select a pond.");
      return;
    }
    try {
      await addFishToPond(selectedPondId, selectedFishId);
      toast.success("Thêm cá vào hồ thành công!");
      handleCloseAddToPondModal();
    } catch (error) {
      toast.error("Thêm cá vào hồ thất bại!");
      console.log(error);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ marginTop: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="h6">Đang tải...</Typography>
      </Container>
    );
  }

  return (
    <div>
      <ToastContainer />
      <h1 style={{ textAlign: "center" }}>Danh sách cá của tôi</h1>
      <hr style={{ width: "800px", textAlign: "center", margin: "0 auto", borderTop: "2px solid #000" }} />
      <div className="row" style={{ textAlign: "center" }}>
        {koiFishList.length > 0 ? (
          koiFishList.map((fish) => (
            <div className="col-md-3" key={fish.fishId}>
              <div className="container">
                <div className="row justify-content-center">
                  <div style={{ width: "82%", height: "200px", overflow: "hidden", margin: "20px 0", borderRadius: "10px" }}>
                    <Typography variant="caption" sx={{ fontSize: "15px", fontWeight: "bold" }}>
                      {fish.fishName}
                    </Typography>
                    <CardMedia component="img" height="300" image={fish.fishImg} alt={fish.fishName} />
                  </div>
                  <Button
                    variant="contained"
                    onClick={() => handleOpenAddToPondModal(fish.fishId)}
                    sx={{ marginTop: 2 }}
                  >
                    <AddIcon /> Add to Pond
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleDeleteFish(fish.fishId)}
                    sx={{ marginTop: 1 }}
                  >
                    <DeleteOutlineIcon />
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Typography variant="h6" sx={{ textAlign: "center" }}>Không tìm thấy kết quả</Typography>
        )}
      </div>
      <Footer />

      {/* Modal for Selecting Pond */}
      <Modal
        open={addToPondModal}
        onClose={handleCloseAddToPondModal}
        aria-labelledby="add-fish-to-pond-modal"
        aria-describedby="add-fish-to-pond-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          textAlign: 'center'
        }}>
          <Typography id="add-fish-to-pond-modal" variant="h6" component="h2">
            Select Pond
          </Typography>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="pond-select-label">Pond</InputLabel>
            <Select
              labelId="pond-select-label"
              id="pond-select"
              value={selectedPondId}
              label="Pond"
              onChange={(e) => setSelectedPondId(e.target.value)}
            >
              {ponds.map((pond) => (
                <MenuItem key={pond.pondId} value={pond.pondId}>
                  {pond.pondName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" sx={{ mt: 1, mr: }} onClick={handleAddFishToPond}>
            Confirm
          </Button>
          <Button variant="outlined" sx={{ mt: 1 }} onClick={handleCloseAddToPondModal}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default MyFishList;
