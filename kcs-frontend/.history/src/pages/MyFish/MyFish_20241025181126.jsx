import { Button, ButtonBase, CardMedia, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../../components/Footer/Footer1";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { deleteFish, getAllFish, getAllPond } from "../../api/pond_fish";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import { Container } from "react-bootstrap";
import { Typography, Menu, MenuItem } from "@mui/material";

function MyFishList() {
  const [heartIconClicked, setHeartIconClicked] = useState(false);
  const [koiFishList, setKoiFishList] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [anchor, setAnchor] = useState(null);
  const [ponds,setPonds] = useState([]);
  const style = {
    list: {
      textAlign: "center",
      position: "relative",
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
    button: {
      position: "relative",
      right: "20px",
      top: "25px",
    },
    fishName: {
      fontSize: "20px",
      fontFamily: "Arial",
    },
    moreInfo: {
      color: "black",
      textDecoration: "underline",
    },
  };

  const handleClick = () => {
    setHeartIconClicked(!heartIconClicked);
  };

  const handleClickMenu = (e) => {
    setAnchor(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchor(null);
  };

  const location = useLocation();

  useEffect(() => {
    getFishes();
    getPond();
  }, [location]);

  const getPond = async () =>{
    try {
      const res = await getAllPond();
      setPonds(res.result)
    } catch (error) {
      console.log(error);
      
  }
}
  const getFishes = async () => {
    try {
      const res = await getAllFish();
      setKoiFishList(res.result);
    } catch (error) {
      console.log(error);
      toast.error("Lấy dữ liệu thất bại!");
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const handleLogout = async (fishId) => {
    try {
      const confirmDelete = window.confirm(
        "Bạn có chắc chắn muốn xóa con cá này?"
      );

      if (!confirmDelete) {
        return;
      }
      await deleteFish(fishId);
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
  if (!koiFishList) {
    return (
      <Container maxWidth="md" sx={{ marginTop: 4, textAlign: "center" }}>
        <Typography variant="h6">Không tìm thấy dữ liệu</Typography>
      </Container>
    );
  }
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
                        onClick={() => handleLogout(fish.fishId)}
                      >
                        <DeleteOutlineIcon style={{ color: "#000000" }} />
                      </Button>
                      <Button className="btn btn-light" onClick={handleClickMenu}>
                        <AddIcon style={{ color: "#000000" }} />
                      </Button>
                      <Menu
                        anchorEl={anchor}
                        open={Boolean(anchor)}
                        onClose={handleCloseMenu}
                      >
                        {ponds.map(}
                        <MenuItem
                          onClick={() => {
                            /* handle choice 1 */ handleCloseMenu();
                          }}
                        >
                          Choice 1
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            /* handle choice 2 */ handleCloseMenu();
                          }}
                        >
                          Choice 2
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            /* handle choice 3 */ handleCloseMenu();
                          }}
                        >
                          Choice 3
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
                  <span style={style.fishName}>{fish.fishName}</span>
                  <br />

                  <Link
                    component={Link}
                    to={`/userhome/myfishlist/fishinfo/${fish.fishId}`}
                    style={style.moreInfo}
                  >
                    Xem thông tin
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
