import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Button,
  CircularProgress
} from "@mui/material";
import { Search, ChevronLeft } from "lucide-react";
import { getAllBlog } from "../../api/userService";
import { ToastContainer, toast } from "react-toastify";

const News = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [listBlogs, setListBlogs] = useState([]);
  const [displayedBlogs, setDisplayedBlogs] = useState([]); // Blogs to render
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = async () => {
    try {
      const res = await getAllBlog();
      setListBlogs(res.result);
      setDisplayedBlogs(res.result); // Initialize with all blogs
    } catch (error) {
      console.log(error);
      toast.error("Lấy dữ liệu thất bại!");
    } finally {
      setLoading(false);
    }
  };

  const filterBlogs = (query) => {
    return listBlogs.filter(
      (blog) =>
        blog.title.toLowerCase().includes(query.toLowerCase()) ||
        blog.content.toLowerCase().includes(query.toLowerCase()) ||
        blog.username.toLowerCase().includes(query.toLowerCase())
    );
  };

  const sortBlogs = (blogs) => {
    return [...blogs].sort((a, b) => {
      return sortOrder === "newest"
        ? new Date(b.publishedDate) - new Date(a.publishedDate)
        : new Date(a.publishedDate) - new Date(b.publishedDate);
    });
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filtered = filterBlogs(query);
    setDisplayedBlogs(sortBlogs(filtered));
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "newest" ? "oldest" : "newest"));
    setDisplayedBlogs(sortBlogs(filterBlogs(searchQuery)));
  };

  const handleChangePageToBlogDetail = (blogId) => {
    navigate(`/blogDetail/${blogId}`);
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ marginTop: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="h6">Đang tải...</Typography>
      </Container>
    );
  }

  if (!listBlogs.length) {
    return (
      <Container maxWidth="md" sx={{ marginTop: 4, textAlign: "center" }}>
        <Typography variant="h6">Không tìm thấy dữ liệu</Typography>
      </Container>
    );
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} closeOnClick pauseOnHover draggable pauseOnFocusLoss />
      <AppBar position="static" sx={{ backgroundColor: "rgb(41, 47, 51)" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            sx={{
              mr: 2,
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "translateX(-3px)",
              },
            }}
            onClick={() => navigate("/userhome")}
          >
            <ChevronLeft />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tin tức và blog
          </Typography>
          <Button onClick={toggleSortOrder}>
            Sort by Date ({sortOrder === "newest" ? "Newest First" : "Oldest First"})
          </Button>
          <div
            style={{
              position: "relative",
              borderRadius: "4px",
              backgroundColor: "rgba(255, 255, 255, 0.15)",
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
              value={searchQuery}
              onChange={handleSearchChange}
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
            fontSize: "8vh",
          }}
        >
          Tin tức và blog
        </Typography>
        <div style={{ marginBottom: "20px" }}>
          <Button variant="contained" color="primary" onClick={() => navigate("/addBlog")} sx={{ mr: 2 }}>
            Tạo bài
          </Button>
          <Button variant="contained" color="secondary" onClick={() => navigate("/my-blogs")}>
            Bài của tôi
          </Button>
        </div>
        <Grid container spacing={4}>
          {displayedBlogs.map((item) => (
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
                onClick={() => handleChangePageToBlogDetail(item.blogId)}
              >
                <CardActionArea>
                  <CardMedia component="img" height="140" image={item.image} alt={item.title} />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h2" sx={{ fontWeight: "bold", color: "#1976d2" }}>
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
  