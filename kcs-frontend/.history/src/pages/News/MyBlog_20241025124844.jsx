import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Correctly import useNavigate
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Button,
  CircularProgress
} from "@mui/material";
import { Search, ChevronLeft } from "lucide-react";
import {  deleteBlog, getMyBlogs } from "../../api/userService";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
const MyBlog = () => {
  const navigate = useNavigate(); // Get the navigate function
  const [loading, setLoading] = useState(true); // Loading state
  const [searchQuery,setSearchQuery] = useState("");
  const [sortItem,setSortItem] = useState([]);
  const [sortOrder,setSortOrder] = useState("newest")
  
  const gotoNewsPage = () => {
    navigate("/news"); // Use navigate to go back to home
  };



  const [listBlogs, setListBlogs] = useState([])
  
   useEffect(()=>{
    getBlogs();
  },[])

  const getBlogs =  async ()=> {
    try {
      const res = await getMyBlogs();
      setListBlogs(res.result)
      setSortItem(res.result)
    } catch (error) {
      console.log(error)
      toast.error("Lấy dữ liệu thất bại!")
      
    }finally {
      setLoading(false); // Set loading to false after fetching
  }
  }

  if (loading) {
    return (
        <Container maxWidth="md" sx={{ marginTop: 4, textAlign: 'center' }}>
            <CircularProgress />
            <Typography variant="h6">Đang tải...</Typography>
        </Container>
    );
}

  const handleChangePageToBlogUpdate= (blogId) =>{
    navigate(`/updateBlog/${blogId}`)
  }
  const handleDelete = async (e,blogId) =>{
      e.stopPropagation();
      try {
            console.log(blogId)
            await deleteBlog(blogId);
            toast.success("Xóa thành công!")
            getBlogs();
      } catch (error) {
            console.log(error)
      }
  }

  const hanldeSearchChange = (e) =>{
    const query = e.target.value;
    setSearchQuery(query);
    updateListBlog(query,sortOrder)
  }

  const updateListBlog = (query,order) =>{
    const filter = listBlogs.filter((blog)=>
      blog.title.toLowerCase().includes(query.toLowerCase())||
      blog.content.toLowerCase().includes(query.toLowerCase())
    )
    const sortItem = filter.sort((a,b) =>{
      return order =="newest"? 
      new Date(b.publishedDate) - new Date(a.publishedDate):
      new Date(a.publishedDate) - new Date(b.publishedDate)
    }
    )
    setSortItem(sortItem);
  }

  const toggleOrder = () =>{
    const neworder = sortOrder=="newest"? "oldeset":"newest";
    setSortOrder(neworder)
    updateListBlog(searchQuery,neworder);
  }


  return (
    <>
    <ToastContainer
     position="top-right" 
     autoClose={2000} 
     hideProgressBar={false} 
     closeOnClick 
     pauseOnHover 
     draggable 
     pauseOnFocusLoss/>
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
            onClick={gotoNewsPage} // Call the function to go back to home
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
              value={searchQuery}
              onChange={hanldeSearchChange}
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
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, textAlign: "center" }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#333",
            borderBottom: "2px solid #1976d2",
            paddingBottom: "10px",
            fontSize: "6vh"
          }}
        >
        
          Blog của tôi
        </Typography>

        <Button onClick={toggleOrder}>
          Sort by Date ({sortOrder === "newest" ? "Newest First" : "Oldest First"})
        </Button>
        {listBlogs.length === 0 ? (
          <Typography variant="h6">Không tìm thấy dữ liệu</Typography>) : null}
         
      
        <Grid container spacing={4}>
          {sortItem.length > 0 ? (sortItem.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
                  },
                }}
                onClick={()=>handleChangePageToBlogUpdate(item.blogId)}
              >
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={item.image}
                    alt={item.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h2"
                      sx={{ fontWeight: "bold", color: "#1976d2" }}
                    >
                      {item.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {item.userName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(item.publishedDate).toLocaleDateString()}
                      
                    </Typography>
                   
                  </CardContent>
                   <Button onClick={(e)=>handleDelete(e,item.blogId)}>Delete</Button>
                </CardActionArea>
              </Card>)
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default MyBlog;
