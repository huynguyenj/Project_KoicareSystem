
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // to get blogId from route params
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress
} from "@mui/material";
import { getBlogById, updateBlog } from "../../api/blogService"; // Assume these API functions exist
import { ToastContainer, toast } from "react-toastify";
function UpdateBlog() {
  return (
    <div>UpdateBlog</div>
  )
}

export default UpdateBlog