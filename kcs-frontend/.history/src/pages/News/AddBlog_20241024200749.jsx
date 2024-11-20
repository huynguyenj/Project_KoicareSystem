import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import { ChevronLeft } from "lucide-react";

const AddBlog = () => {
  const navigate = useNavigate(); // Get the navigate function

  const [blog,setBlog] = useState({
      title:"",
      content:"",
      publishedDate: null,
      image:null
  })

  const handleChange = (e) =>{
      const {name,value} = e.target;
      setBlog({...blog, [name]:value})
      console.log(blog)
  }
  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("image",blog.image)
    data.append("title",blog.title)
    data.append("content",blog.content)
    data.append("publishedDate",blog.publishedDate)
    console.log(blog)

    

  };

  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e)=>{
      const file = e.target.files[0];
      setBlog({...blog, image: file }); // Update the image property with the selected file
      const reader = new FileReader();
      reader.onload = () => {
          setImagePreview(reader.result); // Update the image preview state with the file contents
      };
      reader.readAsDataURL(file);
  }
  const gotoHomePage = () => {
    navigate("/news"); // Navigate to home page
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "rgb(41, 47, 51)" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="back"
            sx={{ mr: 2 }}
            onClick={gotoHomePage} // Call the function to go back to home
          >
            <ChevronLeft />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Add Blog
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create a New Blog Post
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Tiêu đề"
            variant="outlined"
            name="title"
            value={blog.title}
            onChange={handleChange}
            sx={{ mb: 2 }}
            required
          />
          <TextField
            fullWidth
            label="Nội dung"
            variant="outlined"
            multiline
            rows={4}
            name="content"
            value={blog.content}
            onChange={handleChange}
            sx={{ mb: 2 }}
            required
          />
                <TextField
            fullWidth
            type="date"
            label="Ngày đăng tin"
            variant="outlined"
            name="publishedDate"
            value={blog.publishedDate}
            onChange={handleChange}
            sx={{ mb: 2 }}
            InputLabelProps={{
                  shrink: true, // Ensure the label doesn't overlap with the date placeholder
                }}
          />
          {imagePreview?( 
             <img
             src={imagePreview}
             alt="Pond"
             style={{
                 width: "50%",
                 height: "auto",
                 borderRadius: "8px",
                 marginBottom: "20px",
             }}
         />):
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

        />}
         
       
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Post
          </Button>
        </form>
      </Container>
    </>
  );
};

export default AddBlog;
