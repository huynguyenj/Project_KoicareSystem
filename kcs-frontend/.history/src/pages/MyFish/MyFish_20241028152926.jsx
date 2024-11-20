import {
  Button,
  CardMedia,
  CircularProgress,
  Typography,
  Menu,
  MenuItem,
  Select,
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
import { Container } from "react-bootstrap";

function MyFishList() {
  const [koiFishList, setKoiFishList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addMenuAnchor, setAddMenuAnchor] = useState(null);
  const [statsMenuAnchor, setStatsMenuAnchor] = useState(null);
  const [ponds, setPonds] = useState([]);
  const [selectedFishId, setSelectedFishId] = useState(null);
  const [pondid,setPondid] = useState(0)
  const style = {
    list: {
      textAlign: "center",
      fontFamily: "Arial",
      margin: "0",
      padding: "0",
    },
    hr: {
      width: "800px",
      textAlign: "center",
      margin: "0 auto",
      borderTop: "2px solid #000000",
    },
    button: { position: "relative", right: "20px", top: "25px" },
    moreInfo: { color: "white", textDecoration: "none" },
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

  const handleOpenStatsMenu = (event, fishId) => {
    setStatsMenuAnchor(event.currentTarget); // Sets the anchor for the stats menu
    setSelectedFishId(fishId); // Sets the selected fish ID correctly
  };

  const handleCloseStatsMenu = () => {
    setStatsMenuAnchor(null);
    setSelectedFishId(null); // Reset the selected fish ID when menu closes
  };

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
      <div className="grid-container">
        <h1 style={style.list}>Danh sách cá của tôi</h1>
        <hr style={style.hr} />
        <div className="row" style={{ textAlign: "center" }}>
          {koiFishList.length > 0 ? (
            koiFishList.map((fish) => (
              <div className="col-md-3" key={fish.fishId}>
                <div className="container">
                  <div className="row justify-content-center">
                    <div
                      style={{
                        width: "82%",
                        height: "200px",
                        overflow: "hidden",
                        margin: "20px 0",
                        borderRadius: "10px",
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{ fontSize: "15px", fontWeight: "bold" }}
                      >
                        {fish.fishName}
                      </Typography>
                      <CardMedia
                        component="img"
                        height="300"
                        image={fish.fishImg}
                        alt={fish.fishName}
                      />
                    </div>
                    <div className="col-2" style={style.button}>
                      <Button
                        className="btn btn-light"
                        onClick={() => handleDeleteFish(fish.fishId)}
                      >
                        <DeleteOutlineIcon style={{ color: "#000000" }} />
                      </Button>
                      <Select
                        value={ponds.pondId || ""}
                        onChange={(e) => handleChange(e.target.value)}
                      >
                        <MenuItem value="">x</MenuItem>
                        {ponds.length > 0 ? (
                          ponds.map((pond) => (
                            <MenuItem key={pond.pondId} value={pond.pondId}>
                              {pond.pondName}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem>Không có dữ liệu</MenuItem>
                        )}
                      </Select>

                      <Button
                        className="btn btn-light"
                        onClick={(e) => handleOpenStatsMenu(e, fish.fishId)}
                      >
                        <ShowChartIcon style={{ color: "#000000" }} />
                      </Button>
                      <Menu
                        anchorEl={statsMenuAnchor}
                        open={Boolean(statsMenuAnchor)}
                        onClose={(e) => handleCloseStatsMenu(e, fish.fishId)}
                      >
                        <MenuItem onClick={() => handleClick(selectedFishId)}>
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
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    position: "relative",
                    right: "25px",
                    bottom: "15px",
                  }}
                >
                  <Link
                    to={`/userhome/myfishlist/fishinfo/${fish.fishId}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button variant="contained" sx={style.moreInfo}>
                      Xem thông tin
                    </Button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              Không tìm thấy kết quả
            </Typography>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default MyFishList;
