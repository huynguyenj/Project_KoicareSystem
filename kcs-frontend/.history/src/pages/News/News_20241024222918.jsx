import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Correctly import useNavigate
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Button
} from "@mui/material";
import { Search, ChevronLeft } from "lucide-react";
import { getAllBlog } from "../../api/userService";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
const News = () => {
  const navigate = useNavigate(); // Get the navigate function

  const gotoHomePage = () => {
    navigate("/userhome"); // Use navigate to go back to home
  };

  const addBlog = () => {
    navigate("/addBlog"); // Navigate to Add Blog page
  };

  const getMyBlogs = () => {
    navigate("/my-blogs"); // Navigate to My Blogs page
  };

  const newsItems = [
    {
      id: 1,
      title: "Global Climate Summit Reaches Landmark Agreement",
      summary:
        "World leaders commit to ambitious carbon reduction targets in a historic climate accord.",
      image:
        "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    },
    {
      id: 2,
      title: "Tech Giant Unveils Revolutionary AI Assistant",
      summary:
        "New AI technology promises to transform daily life with unprecedented language understanding.",
      image:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    },
    {
      id: 3,
      title: "Breakthrough in Renewable Energy Storage",
      summary:
        "Scientists develop a new battery technology that could make renewable energy more reliable.",
      image:
        "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    },
    {
      id: 4,
      title: "Global Economic Forum Addresses Inequality",
      summary:
        "World economic leaders propose new strategies to combat rising global inequality.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2426&q=80",
    },
  ];

  const [listBlogs, setListBlogs] = useState([])
  useEffect(()=>{
    getBlogs();
  },[])

  const getBlogs =  async ()=> {
    try {
      const res = await getAllBlog();
      setListBlogs(res.result)
    } catch (error) {
      console.log(error)
      toast.error("Lấy dữ liệu thất bại!")
    }
  }

  const handleChangePageToBlogDetail= (blogId) =>{
    navigate(`blogDetail/${blogId}`)
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
     pauseOnFocusLoss/>
      <AppBar position="static" sx={{ backgroundColor: "rgb(41, 47, 51)" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            sx={{
              mr: 2,
              transition: "transform 0.3s ease-in-out", // Smooth transition
              "&:hover": {
                transform: "translateX(-3px)", // Move left on hover
              },
            }}
            onClick={gotoHomePage} // Call the function to go back to home
          >
            <ChevronLeft />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tin tức và blog
          </Typography>
          <div
            style={{
              position: "relative",
              borderRadius: "4px",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.25)" },
              marginLeft: 0,
              width: "15%",
            }}
          >
            <div
              style={{
                padding: "0 16px",
                height: "100%",
                position: "absolute",
                pointerEvents: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Search />
            </div>
            <InputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              sx={{
                color: "inherit",
                "& .MuiInputBase-input": {
                  padding: "8px 8px 8px 0",
                  paddingLeft: `calc(1em + 32px)`,
                  transition: "width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                  width: "100%",
                },
              }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, textAlign: "center" }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#333",
            borderBottom: "2px solid #1976d2",
            paddingBottom: "10px",
            fontSize: "8vh"
          }}
        >
          Tin tức và blog
        </Typography>
          {/* Add Blog and Get My Blogs Buttons */}
              {/* Add Blog and Get My Blogs Buttons */}
        <div style={{ marginBottom: "20px" }}>
          <Button variant="contained" color="primary" onClick={addBlog} sx={{ mr: 2 }}>
            Tạo bài
          </Button>
          <Button variant="contained" color="secondary" onClick={getMyBlogs}>
            Bài của tôi
          </Button>
        </div>
        <Grid container spacing={4}>
          {listBlogs.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
                  },
                }}
                onClick={()=>handleChangePageToBlogDetail(item.)}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.image}
                    alt={item.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h2"
                      sx={{ fontWeight: "bold", color: "#1976d2" }}
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {item.userName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(item.publishedDate).toLocaleDateString()}
                      
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default News;
