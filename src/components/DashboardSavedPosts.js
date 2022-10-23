import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Api, { endpoints } from "../config/Api";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import JobItem from "./JobItem";
import CenterDiv from "./CenterDiv";
import Button from "@mui/material/Button";

const DashboardSavedPosts = () => {
  const [posts, setPosts] = useState([]);

  let loadPosts = async () => {
    const res = await Api.get(endpoints["mySavedPosts"], {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res);
    res.data.results ? setPosts(res.data.results) : setPosts(res.data);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleDelete = (id) => {
    const handleDeleteSavedPost = async () => {
      const res = await Api.delete(endpoints["savedPostDelete"](id), {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(res.data);
      loadPosts();
    };
    handleDeleteSavedPost();
  };

  return (
    <div>
      <Typography
        variant="h3"
        textAlign="center"
        gutterBottom
        component="h1"
        className="name"
      >
        Các bài viết đã lưu
      </Typography>
      <Box sx={{ width: "100%" }}>
        <Grid container spacing={1}>
          {posts.length > 0 ? (
            posts.map((item, index) => (
              <Grid item xs={12} md={6} key={index}>
                <JobItem data={item.post_detail} />
                <CenterDiv>
                  <Button
                    variant="contained"
                    onClick={() => handleDelete(item.id)}
                  >
                    Bỏ lưu
                  </Button>
                </CenterDiv>
              </Grid>
            ))
          ) : (
            <Typography variant="h4" gutterBottom component="h4">
              Không có kết quả
            </Typography>
          )}
        </Grid>
      </Box>
    </div>
  );
};

export default DashboardSavedPosts;
