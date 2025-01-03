import React, { useState } from 'react'
import { Container, Typography, CardMedia, CardContent, Card } from '@mui/material';
import { useParams } from 'react-router-dom';
function BlogInfo() {
   
      const [blog,setBlog] = useState({});
      const {blogId} = useParams();
      
      const getBlogDetail = async (blogId) =>{
            try
      }
      
      return (
    <>
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
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Published on: {new Date(blog.publishedDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {blog.content}
          </Typography>
        </CardContent>
      </Card>
    </Container>
    </>
  );
};
    
  
export default BlogInfo