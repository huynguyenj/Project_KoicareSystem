
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // to get blogId from route params
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress
} from "@mui/material";

import { ToastContainer, toast } from "react-toastify";
function UpdateBlog() {
      const navigate = useNavigate();
      const { blogId } = useParams(); // Get the blogId from the route
      const [loading, setLoading] = useState(true);
      const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    image: "",
  });
  return (
    <div>UpdateBlog</div>
  )
}

export default UpdateBlog