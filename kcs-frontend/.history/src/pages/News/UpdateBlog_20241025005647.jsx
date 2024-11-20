
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
            publishedDate:""
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

    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e)=>{
        const file = e.target.files[0];
        setBlogData({...blogData, image: file }); // Update the image property with the selected file
        const reader = new FileReader();
        reader.onload = () => {
            setImagePreview(reader.result); // Update the image preview state with the file contents
        };
        reader.readAsDataURL(file);
    }
    const handleUpdate = async () => {
      try {
       
        toast.success("Cập nhật blog thành công!");
        navigate("/myBlogs"); // Navigate back to the blog list
      } catch (error) {
        console.log(error)
        toast.error("Cập nhật blog thất bại!");
      }
    };
    const goToNewsPages = ()=>{
      navigate("/my-blogs")
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
            onClick={goToNewsPages}
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
      {imagePreview? 
      <img
      src={imagePreview}
      alt="Preview"
      style={{
        marginTop: "5px",
        maxWidth: "80%",
        height: "150px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }}/>
      :<img
          src={blogData.image}
          alt="Preview"
          style={{
            marginTop: "5px",
            maxWidth: "80%",
            height: "150px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
        />
        <TextField
          fullWidth
          type="file"
          accept="image/*"
          label="Hình ảnh"
          variant="outlined"
          name="image"
          onChange={handleImageChange}
          sx={{ mb: 2 }}
          InputLabelProps={{
            shrink: true, // Ensure the label doesn't overlap with the date placeholder
          }}
        />)
        }
            
        <TextField
        label="Ngày đăng"
        type="date"
        name="publishedDate"
        value={blogData.publishedDate}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        rows={6}
      />
      <Button variant="contained" color="primary" onClick={handleUpdate} sx={{ mt: 2 }}>
        Cập nhật
      </Button>
    </Container>
      </>
    
  )
}

export default UpdateBlog