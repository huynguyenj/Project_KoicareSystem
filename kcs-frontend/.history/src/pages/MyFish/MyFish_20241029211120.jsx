import {
  Button,
  CardMedia,
  CircularProgress,
  Typography,
  Menu,
  MenuItem,
  Container,
  Grid,
  Card,
  Box,
  CardContent,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../../components/Footer/Footer1";
import AddIcon from "@mui/icons-material/Add";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import InfoIcon from "@mui/icons-material/Info";
import {
  addFishToPond,
  deleteFish,
  getAllFish,
  getAllPond,
} from "../../api/pond_fish";

function MyFishList() {
  const [koiFishList, setKoiFishList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addMenuAnchor, setAddMenuAnchor] = useState(null);
  const [statsMenuAnchor, setStatsMenuAnchor] = useState(null);
  const [ponds, setPonds] = useState([]);
  const [selectedFishId, setSelectedFishId] = useState(null);

  // Separate handle functions
  const handleOpenAddMenu = (event) => setAddMenuAnchor(event.currentTarget);
  const handleCloseAddMenu = () => setAddMenuAnchor(null);

  const handleOpenStatsMenu = (event, fishId) => {
    setStatsMenuAnchor(event.currentTarget);
    setSelectedFishId(fishId); // set selected fish ID correctly for stats menu
  };
  const handleCloseStatsMenu = () => {
    setStatsMenuAnchor(null);
    setSelectedFishId(null); // reset selected fish ID when menu closes
  };

  const handleAddFishToPond = async (pondId, fishId) => {
    try {
      await addFishToPond(pondId, fishId);
      console.log(fishId);
      toast.success("Thêm cá vào hồ thành công!");
    } catch (error) {
      toast.error("Thêm cá vào hồ thất bại!");
      console.log(error);
    }
  };

  const location = useLocation();
  const navigator = useNavigate();
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
      console.log(koiFishList);
    } catch (error) {
      console.log(error);
      toast.error("Lấy dữ liệu thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFish = async (fishId) => {
    try {
      const confirmDelete = window.confirm(
        "Bạn có chắc chắn muốn xóa con cá này?"
      );
      if (!confirmDelete) return;
      await deleteFish(fishId);
      console.log(fishId);
      toast.success("Xóa thành công");
      getFishes();
    } catch (error) {
      console.log(error);
      toast.error("Xóa dữ liệu thất bại!");
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

  const handleClick = (fishId) => {
    setStatsMenuAnchor(null);
    console.log("Navigating to fishDevelopment with ID:", fishId); // Log the ID
    navigator(`/userhome/addDevelop/${fishId}`);
  };

  const changeToPageShowHistory = (fishId) => {
    setStatsMenuAnchor(null);
    console.log("Navigating to fishDevelopment with ID:", fishId); // Log the ID
    navigator(`/userhome/fishDevelopment/${fishId}`);
  };
  return (
    <div>
      <ToastContainer />
      <Container sx={{ py: 2 }}>
        <Grid container spacing={2}>
          {koiFishList.length > 0 ? (
            koiFishList.map((fish) => (
              <Grid item xs={12} sm={6} md={4} key={fish.fishId}>
                <Card sx={{ boxShadow: 4, borderRadius: 2 }}>
                  <Box>
                    <CardMedia
                      component="img"
                      height="250"
                      image={fish.fishImg}
                      alt={fish.fishName}
                      sx={{ borderRadius: "4px 4px 0 0" }}
                    />

                    <CardContent>
                      <Grid
                        container
                        spacing={0}
                        justifyContent="space-around"
                        sx={{ mb: 2 }}
                      >
                        <Grid item>
                          <Tooltip title = {"Xóa cá"} arrow>
                            <Button
                              color="error"
                              onClick={() => handleDeleteFish(fish.fishId)}
                            >
                              <DeleteOutlineIcon />
                            </Button>
                          </Tooltip>
                        </Grid>

                        <Grid item>
                        <Tooltip title = {"Thêm cá vào hồ"} arrow>
                          <Button
                            color="primary"
                            onClick={handleOpenAddMenu} // Open the add fish to pond menu
                          >
                            <AddIcon />
                          </Button>
                          <Menu
                            anchorEl={addMenuAnchor}
                            open={Boolean(addMenuAnchor)}
                            onClose={handleCloseAddMenu} // Close add fish to pond menu
                          >
                            {ponds.map((pond) => (
                              <MenuItem
                                key={pond.pondId}
                                onClick={() => {
                                  handleAddFishToPond(pond.pondId, fish.fishId);
                                  handleCloseAddMenu();
                                }}
                              >
                                {pond.pondName}
                              </MenuItem>
                            ))}
                          </Menu>
                          </Tooltip>
                        </Grid>

                        <Grid item>
                        <Tooltip title = {"Chức năng xem và thêm thông tin phát triển của cá"} arrow>
                          <Button
                            color="success"
                            onClick={(e) => handleOpenStatsMenu(e, fish.fishId)} // Open stats menu for selected fish
                          >
                            <ShowChartIcon />
                          </Button>
                          <Menu
                            anchorEl={statsMenuAnchor}
                            open={Boolean(statsMenuAnchor)}
                            onClose={handleCloseStatsMenu} // Close stats menu
                          >
                            <MenuItem
                              onClick={() => handleClick(selectedFishId)}
                            >
                              Thêm thông kê phát triển
                            </MenuItem>
                            <MenuItem
                              onClick={() =>
                                changeToPageShowHistory(selectedFishId)
                              }
                            >
                              Xem thống kê phát triển
                            </MenuItem>
                          </Menu>
                          </Tooltip>
                        </Grid>
                        <Grid item mt={1}>
                        <Tooltip title = {"Thêm cá vào hồ"} arrow>
                          <Link
                            to={`/userhome/myfishlist/fishinfo/${fish.fishId}`}
                            style={{
                              textDecoration: "none",
                            }}
                          >
                            <InfoIcon />
                          </Link>
                          </Tooltip>
                        </Grid>
                      </Grid>
                      <Typography
                        sx={{ mb: 2, textAlign: "center", backgroundColor: "" }}
                      >
                        {fish.fishName}
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography
              variant="h6"
              sx={{ textAlign: "center", width: "100%" }}
            >
              Không tìm thấy kết quả
            </Typography>
          )}
        </Grid>
      </Container>
    </div>
  );
}

export default MyFishList;
