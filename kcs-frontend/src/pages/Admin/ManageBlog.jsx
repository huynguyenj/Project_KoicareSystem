import React, { useEffect, useState } from "react";
import { deleteBlogAdmin, getAllBlog } from "../../api/userService";
import {
  AppBar,
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast, ToastContainer } from "react-toastify";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
function ManageBlog() {
  const [blogList, setBlogList] = useState([]);
  const [sort, setSort] = useState("");
  const [query, setQuery] = useState("");
  const [displayBlog, setDisplayBlog] = useState([]);
  const [selectItem, setSelectItem] = useState([]);
  const limitBlogPerPage = 6;
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  useEffect(() => {
    getBlogs();
  }, []);
  const getBlogs = async () => {
    try {
      const res = await getAllBlog();
      setBlogList(res.result);
      setDisplayBlog(res.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSort = (e) => {
    const order = e.target.value;
    setSort(order);
    handleListBlog(query, order);
  };

  const handleListBlog = (query, order) => {
    const listSearch = blogList.filter(
      (blog) =>
        blog.title.toLowerCase().includes(query.toLowerCase()) ||
        blog.content.toLowerCase().includes(query.toLowerCase()) ||
        blog.userName.toLowerCase().includes(query.toLowerCase())
    );
    const sortList = listSearch.sort((a, b) => {
      return order == "newest"
        ? new Date(b.publishedDate) - new Date(a.publishedDate)
        : new Date(a.publishedDate) - new Date(b.publishedDate);
    });
    setDisplayBlog(sortList);
  };

  const handleSearch = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    handleListBlog(searchQuery, sort);
  };

  const handleSelectItem = (id) => {
    setSelectItem((prev) =>
      prev.includes(id) ? prev.filter((userId) => userId !== id) : [...prev, id]
    );
  };

  const handleDelete = async () => {
    const confirm = window.confirm("Bạn có chắc muốn xóa bài này!");

    if (!confirm) {
      return;
    }
    try {
      await Promise.all(selectItem.map((id) => deleteBlogAdmin(id)));
      getBlogs();
      toast.success("Xóa bài thành công");
    } catch (error) {
      console.log(error);
      toast.error("Xóa bài thất bại!");
    }
  };

  const handlePageChange = (e, value) => {
    setPage(value);
  };

  const displayPage = displayBlog.slice(
    (page - 1) * limitBlogPerPage,
    page * limitBlogPerPage
  );

  return (
    <div>
      <ToastContainer />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#f57c00" }}>
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Danh sách blog, tin tức
            </Typography>
          </Toolbar>
        </AppBar>

        <Box sx={{ p: 3 }}>
          <Box sx={{ mb: 2, display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
              disabled={selectItem == 0}
            >
              Xóa blog
            </Button>
            <FormControl sx={{ minWidth: 110 }}>
              <InputLabel id="sort">Sort</InputLabel>
              <Select id="sort" label="Sort" value={sort} onChange={handleSort}>
                <MenuItem value="newest">Ngày mới nhất</MenuItem>
                <MenuItem value="oldest">Ngày cũ nhất</MenuItem>
              </Select>
            </FormControl>
          
              <Box display="flex" gap={1}>
                {!show ? (
                  <Button variant="contained" onClick={() => setShow(true)}>
                    <SearchIcon />
                  </Button>
                ) : (
                  <>
                    <TextField
                      label="Search"
                      variant="outlined"
                      value={query}
                      onChange={handleSearch}
                      sx={{ minWidth: 220,justifyContent:'center' }}
                    ></TextField>
                    <Button onClick={() => setShow(false)}>
                      <ArrowBackIosIcon />
                    </Button>
                  </>
                )}
              </Box>
           
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Choice</TableCell>
                  <TableCell>Blog id</TableCell>
                  <TableCell>User name</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Content</TableCell>
                  <TableCell>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {displayBlog.length > 0 ? (
                  displayPage.map((blog) => (
                    <TableRow key={blog.blogId}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectItem.includes(blog.blogId)}
                          onChange={() => handleSelectItem(blog.blogId)}
                        />
                      </TableCell>
                      <TableCell>{blog.blogId}</TableCell>
                      <TableCell>{blog.userName}</TableCell>
                      <TableCell>
                        <img
                          src={blog.image}
                          style={{
                            width: 100,
                            height: 80,
                            borderRadius: "5px",
                          }}
                        ></img>
                      </TableCell>
                      <TableCell>{blog.title}</TableCell>
                      <TableCell>
                        <Tooltip title={blog.content} arrow>
                          <Typography
                            maxWidth={150}
                            whiteSpace="nowrap"
                            overflow="hidden"
                            textOverflow="ellipsis"
                          >
                            {blog.content}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        {new Date(blog.publishedDate).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableCell>
                    <Typography>Không có dữ liệu</Typography>
                  </TableCell>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ mt: 1 }} display="flex" justifyContent="center">
            <Pagination
              count={Math.ceil(displayBlog.length / limitBlogPerPage)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            ></Pagination>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default ManageBlog;
