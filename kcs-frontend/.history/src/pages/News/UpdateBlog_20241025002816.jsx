
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // to get blogId from route params
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  AppBar,
  Toolbar,
  IconButton
} from "@mui/material";

import { ToastContainer, toast } from "react-toastify";
import { getBlogInfo } from "../../api/userService";
import { ChevronLeft } from "lucide-react";
function UpdateBlog() {
      const navigate = useNavigate();
      const { blogId } = useParams(); // Get the blogId from the route
      const [loading, setLoading] = useState(true);
      const [blogData, setBlogData] = useState({
            title: "",
            content: "",
            image: "",
  });
  useEffect(() => {
      getBlogDetails();
    }, [blogId]);

    const getBlogDetails = async () => {
      try {
        const res = await getBlogInfo(blogId); // Fetch blog details by ID
        setBlogData(res.result); // Set the fetched blog data
      } catch (error) {
        console.log(error)
        toast.error("Lỗi khi lấy dữ liệu blog!");
      } finally {
        setLoading(false);
      }
    };

    const handleInputChange = (e) => {
      const{name,value} = e.target
      setBlogData({
        ...blogData,
        [name]: value,
      });
    };

    const handleUpdate = async () => {
      try {
       
        toast.success("Cập nhật blog thành công!");
        navigate("/myBlogs"); // Navigate back to the blog list
      } catch (error) {
        console.log(error)
        toast.error("Cập nhật blog thất bại!");
      }
    };
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
           
          >
            <ChevronLeft />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Blog của tôi
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
          </div>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4 }}>
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
      <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
        Cập nhật Blog
      </Typography>
      <TextField
        label="Tiêu đề"
        name="title"
        value={blogData.title}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Nội dung"
        name="content"
        value={blogData.content}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        multiline
        rows={6}
      />
      <TextField
        label="URL hình ảnh"
        name="image"
        value={blogData.image}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleUpdate} sx={{ mt: 2 }}>
        Cập nhật
      </Button>
    </Container>
      </>
    
  )
}

export default UpdateBlog