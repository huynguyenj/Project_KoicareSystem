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

  // State to hold form data
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [imageUrl, setImageUrl] = useState("");

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
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append(blog.image)
    data.append(blog.title)
    data.append(blog.content)
    data.append(blog.publishedDate)

  };

  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e)=>{
      const file = e.target.files[0];
      setBlog({ ...blog, pondImg: file }); // Update the image property with the selected file
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
            variant="outlined"
            name="publishedDate"
            value={blog.publishedDate}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          {imagePreview?( 
            <TextField
            fullWidth
            label="Hình ảnh"
            variant="outlined"
            name="image"
            value={imagePreview}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />):
           <TextField
          fullWidth
          label="Hình ảnh"
          variant="outlined"
          name="image"
          value={blog.image}
          onChange={handle}
          sx={{ mb: 2 }}
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
