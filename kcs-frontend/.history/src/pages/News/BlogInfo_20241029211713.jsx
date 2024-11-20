import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  CardMedia,
  CardContent,
  Card,
  AppBar,
  InputBase,
  Toolbar,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getBlogInfo } from "../../api/userService";
import { Search, ChevronLeft } from "lucide-react";
function BlogInfo() {
  const [blog, setBlog] = useState({});
  const { blogId } = useParams();
  const navigator = useNavigate();
  const [loading, setLoading] = useState(true); // Loading state
  useEffect(() => {
    getBlogDetail(blogId);
  }, []);
  const getBlogDetail = async (blogId) => {
    try {
      const res = await getBlogInfo(blogId);
      setBlog(res.result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const handleChangePage = () => {
    navigator("/news");
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ marginTop: 4, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="h6">Đang tải...</Typography>
      </Container>
    );
  }
  if (!blog) {
    return (
      <Container maxWidth="md" sx={{ marginTop: 4, textAlign: "center" }}>
        <Typography variant="h6">Không tìm thấy dữ liệu</Typography>
      </Container>
    );
  }

  return (
    <>
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
            onClick={handleChangePage} // Call the function to go back to home
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
          ></div>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ marginTop: 4 }}>
        <Card>
          <CardMedia
            component="img"
            height="300"
            image={blog.image}
            alt={blog.title}
          />
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom>
              {blog.title}
            </Typography>
            <Typography variant="body1" color="black" gutterBottom>
              Ngày đăng: {new Date(blog.publishedDate).toLocaleDateString()}
            </Typography>
            <Typography
              variant="body1"
              color="black"
              dangerouslySetInnerHTML={{
                __html: blog.content
                  ? blog.content.replace(/\r\n/g, "<br />")
                  : "Loading...",
              }}
            />
          </CardContent>
        </Card>
      </Container>
    </>
  );
}

export default BlogInfo;
