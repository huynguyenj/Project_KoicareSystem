import React, { useEffect, useState } from 'react'
import { Container, Typography, CardMedia, CardContent, Card, AppBar, InputBase, Toolbar, IconButton } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { getBlogInfo } from '../../api/userService';
import { Search, ChevronLeft } from "lucide-react";
function BlogInfo() {
   
      const [blog,setBlog] = useState({});
      const {blogId} = useParams();
      const navigator = useNavigate();
      useEffect(()=>{
            getBlogDetail(blogId)
      },[])
      const getBlogDetail = async (blogId) =>{
            try {
                  const res = await getBlogInfo(blogId);
                  setBlog(res.result);
            } catch (error) {
                  console.log(error)
            }
      }
      
      const handleChangePage = ()=>{
            navigator()
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
            onClick={} // Call the function to go back to home
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
            Published on: {new Date(blog.publishedDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body1" color="black">
            {blog.content}
          </Typography>
        </CardContent>
      </Card>
    </Container>
    </>
  );
};
    
  
export default BlogInfo