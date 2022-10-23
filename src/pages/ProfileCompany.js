import React from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import Typography from "@mui/material/Typography";
import CenterDiv from "../components/CenterDiv";
import Avatar from "@mui/material/Avatar";
import { UserContext } from "../App";
import { useState, useContext, useEffect } from "react";
import img from "../images/404.jpg";
import Api, { endpoints } from "../config/Api";
import Rating from "../components/Rating";
import CommentList from "../components/CommentList";
import Grid from "@mui/material/Grid";
import TabItem from "../components/TabItem";

function ProfileCompany() {
  const [user, dispatch] = useContext(UserContext);

  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [profileDetail, setProfileDetail] = useState(null);
  const [rate, setRate] = useState(null);
  const [comment, setComment] = useState("");
  const [commentData, setCommentData] = useState([]);
  const [posts, setPosts] = useState([]);
  const [profileDetailId, setProfileDetailId] = useState(null);

  const handleGetCompanyProfile = async () => {
    const res = await Api.get(endpoints["getCompanyProfile"](id));
    console.log(res.data);
    setProfile(res.data);
    return res.data.id;
  };

  const handleGetProfileDetails = async (profileid) => {
    const res = await Api.get(endpoints["company-detail"](profileid));
    console.log(res.data);
    setProfileDetail(res.data);
    setProfileDetailId(profileid);
    setRate(res.data.rating);
  };

  const getComments = async (profileid) => {
    const res = await Api.get(endpoints["companyCommentsById"](profileid));
    console.log(res.data);
    setCommentData(res.data);
  };

  const handlePostComment = async () => {
    if (comment.length > 0) {
      const res = await Api.post(
        endpoints["companyCreateCommentsById"](profileDetailId),
        {
          content: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
        .then((res) => {
          getComments(profileDetailId);
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      alert("Bình luận không thể trống");
    }
  };

  const handleRating = async () => {
    const res = await Api.post(
      endpoints["user-rating"](profileDetailId),
      {
        rate: rate,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );

    console.log(res.data);
  };

  const handleGetCompanyPost = async (companyId) => {
    const res = await Api.get(endpoints["companyPosts"](companyId));
    setPosts(res.data);
    console.log(res.data);
  };

  useEffect(() => {
    console.log(rate);

    if (rate) {
      handleRating().then(() => {
        handleGetCompanyProfile().then((profileid) => {
          handleGetProfileDetails(profileid);
        });
      });
    } else {
      handleGetCompanyProfile().then((profileid) => {
        handleGetProfileDetails(profileid);
      });
    }

    if (profileDetailId) {
      handleGetCompanyPost(profileDetailId);
      getComments(profileDetailId);
    }
  }, [rate, profileDetailId, user]);

  if (!profile || !profileDetail) {
    return (
      <div>
        <Header />
        <div>loading...</div>
        <Footer />
      </div>
    );
  }
  console.log(user);
  const fomatUrl = (url) => {
    if (url.includes("http")) {
      return url;
    } else {
      return "http://" + url;
    }
  };

  return (
    <div className="profile">
      <Header />
      <Box m={4}>
        <CenterDiv>
          {profileDetail?.avatar_path ? (
            <Avatar
              alt="Remy Sharp"
              src={profileDetail.avatar_path}
              style={{ height: "270px", width: "270px" }}
            />
          ) : (
            <Avatar
              alt="alt"
              src={img}
              style={{ height: "270px", width: "270px" }}
            />
          )}
        </CenterDiv>
        <Typography
          variant="h5"
          textAlign="center"
          gutterBottom
          component="div"
          className="name"
        >
          Công ty: {profileDetail?.company_name}
        </Typography>
        {profileDetail?.web_url ? (
          <Typography
            variant="h5"
            textAlign="center"
            gutterBottom
            component="div"
            className="name"
          >
            Website:{" "}
            <a
              target="_blank"
              href={`${fomatUrl(profileDetail?.web_url)}`}
              rel="noreferrer"
            >
              {profileDetail?.web_url}
            </a>
          </Typography>
        ) : (
          <></>
        )}
        {profileDetail?.description ? (
          <Typography
            variant="h5"
            textAlign="center"
            gutterBottom
            component="div"
            className="name"
          >
            Mô tả: {profileDetail?.description}
          </Typography>
        ) : (
          <></>
        )}
        {user && user.role === "User" ? (
          <>
            <Typography
              variant="h6"
              textAlign="center"
              gutterBottom
              component="div"
              className="name"
            >
              Bạn đánh giá {rate} cho nhà tuyển dụng này
            </Typography>
            <Typography
              variant="h5"
              textAlign="center"
              gutterBottom
              component="div"
              className="name"
            >
              <Rating value={rate} setRate={setRate} /> (Điểm đánh giá trung
              bình: {profileDetail.rateAvg})
            </Typography>
          </>
        ) : (
          <Typography
            variant="h5"
            textAlign="center"
            gutterBottom
            component="div"
            className="name"
          >
            (Điểm đánh giá trung bình: {profileDetail.rateAvg})
          </Typography>
        )}
        {profileDetail?.email ? (
          <Typography
            variant="h5"
            textAlign="center"
            gutterBottom
            component="div"
            className="name"
          >
            Email:{" "}
            <a href={`mailto:${profileDetail?.email}`}>
              {profileDetail?.email}
            </a>
          </Typography>
        ) : (
          <></>
        )}

        <Typography variant="h2" textAlign="left" component="h2">
          Một số bài đăng của công ty
        </Typography>

        <Box sx={{ width: "100%" }}>
          <Grid container spacing={1}>
            {posts.slice(0, 6).map((item, index) => (
              <Grid item xs={12} md={6} key={index}>
                <TabItem data={item} />
              </Grid>
            ))}
          </Grid>
        </Box>

        <CommentList
          data={commentData}
          handlePostComment={handlePostComment}
          comment={comment}
          setComment={setComment}
          getComments={getComments}
        />
      </Box>

      <Footer />
    </div>
  );
}

export default ProfileCompany;
