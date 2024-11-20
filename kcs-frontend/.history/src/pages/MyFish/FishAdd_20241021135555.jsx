import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Card,
  Divider,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast

const FishForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    shape: "",
    size: "",
    weight: "",
    gender: "",
    age: "",
    origin: "",
    price: "",
    health: "",
    image: null, // Add an image property to store the uploaded image
  });

  const [imagePreview, setImagePreview] = useState(null); // Add a state to store the image preview

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file }); // Update the image property with the selected file
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result); // Update the image preview state with the file contents
    };
    reader.readAsDataURL(file);
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
      
    const data = new FormData();
    // Append form data to FormData object
    data.append("pondName", formData.pondName);
    data.append("pondImg", formData.pondImg);
    data.append("size", formData.size);
    data.append("depth", formData.depth);
    data.append("volume", formData.volume);
    data.append("drainCount", formData.drainCount);
    data.append("pumpCapacity", formData.pumpCapacity);
    console.log("Form submitted:", formData);
    try {
        await addPond(data);
        toast.success("Hồ cá đã được thêm thành công!");
        
    } catch (error) {
        console.log(error)
        toast.error("Có lỗi xảy ra khi thêm hồ cá.");
    }
};

  return (
    <>
    
    </>
   
};

export default FishForm;