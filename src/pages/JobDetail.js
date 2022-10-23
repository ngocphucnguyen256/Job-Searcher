import Footer from "../partials/Footer";
import Header from "../partials/Header";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CkeditorHtml from "../components/CkeditorHtml";
import Item from "../components/Item";
import { useParams } from "react-router-dom";
import React, { useEffect, useState, useContext, useRef } from "react";
import Api, { endpoints } from "../config/Api";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import CenterDiv from "../components/CenterDiv";
import { UserContext } from "../App";
import ModalComponent from "../components/ModalComponent";
import TextField from "@mui/material/TextField";
import img from "../images/404.jpg";
import Avatar from "@mui/material/Avatar";
import Moment from "react-moment";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import CircularProgress from "@mui/material/CircularProgress";

export default function JobDetails(props) {
  const { id } = useParams();
  const cvRef = useRef();

  const [post, setPost] = useState(null);
  const [applies, setApplies] = useState(null);
  const [user, dispatch] = useContext(UserContext);
  const [openDialog, setOpenDialog] = useState(false);
  const [saved, setSaved] = useState(false);
  const [authenticated, setAuthenticated] = useState(props.authenticated);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpenDialog(true);
  const handleClose = () => setOpenDialog(false);

  const loadPostAppliessById = async () => {
    const res = await Api.get(endpoints["post-detail-applies"](id));
    console.log("applies", res.data);
    setApplies(res.data);
  };

  useEffect(() => {
    if (props.authenticated) {
      setAuthenticated(props.authenticated);
    }

    const loadPostDetailsById = async () => {
      const res = await Api.get(endpoints["post-detail"](id));
      setPost(res.data);

      if (
        res.data &&
        res.data.company_detail &&
        user !== undefined &&
        res.data.company_detail.user === user.id
      ) {
        setAuthenticated(true);
      }
      console.log(authenticated);

      if (authenticated) {
        loadPostAppliessById();
      }
    };
    const loadPostDetailsByIdWithHeader = async () => {
      const res = await Api.get(endpoints["post-detail"](id), {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(res.data);
      setPost(res.data);
      setSaved(res.data.is_saved);
    };

    if (user && user.role && user.role === "User") {
      loadPostDetailsByIdWithHeader();
    } else {
      loadPostDetailsById();
    }
  }, []);

  const handleApplyFormOpen = () => {
    handleOpen();
  };

  const handleApplySubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    var formData = new FormData();

    if (authenticated) {
      alert("Không thể ứng tuyển vào việc làm của chính bạn");
    } else if (
      cvRef.current.files[0] &&
      id &&
      user.id &&
      data.get("description")
    ) {
      setLoading(true);
      formData.append("CV", cvRef.current.files[0]);
      formData.append("post", id);
      formData.append("user", user.id);
      formData.append("description", data.get("description"));

      let res = await Api.post(endpoints["applies"], formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          console.log(res.data);
          handleClose();
          alert("Ứng tuyển thành công");
        })
        .catch((err) => {
          if (err.response.status === 400) {
            alert("Bạn đã ứng tuyển vào việc làm này rồi");
          } else {
            alert(err);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      alert("Vui lòng nhập các trường ");
    }
  };

  const handleSaveSubmit = async () => {
    let res = await Api.post(
      endpoints["mySavedPosts"],
      {
        post: id,
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    )
      .then((res) => {
        setSaved(true);
      })
      .catch((err) => {
        alert("Dã lưu việc làm này");
      });
  };

  console.log(post);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {props.removeHeader ? <></> : <Header />}

      <main className="job-detail">
        {authenticated ? (
          <section className="mt-2">
            <Typography variant="h4" gutterBottom component="h4" align="center">
              Danh sách ứng viên
            </Typography>
            {applies != null && applies.length > 0 ? (
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }}>
                  {applies.map((item, index) => (
                    <Grid item xs={12} sm={4} md={4} key={index}>
                      <Item>
                        <Link
                          to={`/profile/${item.user}`}
                          className="link deco-none black"
                        >
                          <CenterDiv>
                            {item.avatar_user ? (
                              <Avatar
                                alt="Remy Sharp"
                                src={item?.avatar_user}
                                style={{ height: "170px", width: "170px" }}
                              />
                            ) : (
                              <Avatar
                                alt="alt"
                                src={img}
                                style={{ height: "170px", width: "170px" }}
                              />
                            )}
                          </CenterDiv>

                          <p className="heading mt-2">
                            Tên: {item?.user_fname}
                          </p>
                          <p className="heading mt-2">
                            Mô tả: <CkeditorHtml data={item?.description} />{" "}
                          </p>
                        </Link>
                      </Item>
                      {item.CV_path ? (
                        <Button
                          onClick={() => {
                            let link = document.createElement("a");
                            link.target = "_blank";
                            link.download = `CV-${item.user}.txt`;
                            link.href = `${item.CV_path}`;
                            link.click();
                          }}
                          variant="contained"
                          fullWidth
                        >
                          Tải CV
                        </Button>
                      ) : (
                        <></>
                      )}
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ) : (
              <Typography
                variant="h3"
                align="center"
                gutterBottom
                component="h3"
              >
                Chưa có ứng viên nào ứng tuyển
              </Typography>
            )}
          </section>
        ) : (
          <></>
        )}
        <section className="header">
          <h1>{post.title}</h1>
          <Link
            to={`/profile-company/${post.company_detail.user}`}
            className="link"
          >
            <CenterDiv>
              {post.avatar_company ? (
                <Avatar
                  alt="Remy Sharp"
                  src={post.avatar_company}
                  style={{ height: "170px", width: "170px" }}
                />
              ) : (
                <Avatar
                  alt="alt"
                  src={img}
                  style={{ height: "170px", width: "170px" }}
                />
              )}
            </CenterDiv>
            <h2>Công ty: {post.company_detail.company_name}</h2>
          </Link>
          {authenticated || user === undefined || user.role !== "User" ? (
            <></>
          ) : (
            <>
              <Button onClick={handleApplyFormOpen} variant="contained">
                Nộp đơn ứng tuyển ngay
              </Button>
              <div style={{ marginTop: 20 }}>
                {saved ? (
                  <Button
                    disabled
                    variant="contained"
                    onClick={handleSaveSubmit}
                    endIcon={<BeenhereIcon />}
                  >
                    Saved
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleSaveSubmit}
                    endIcon={<BookmarkAddIcon />}
                  >
                    Save
                  </Button>
                )}
              </div>
            </>
          )}

          {user === undefined ||
          (user && user.role && user.role !== "Hirer") ? (
            <div>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Hoặc nộp đơn ứng tuyển qua email
              </Typography>
              <Button
                onClick={() =>
                  (window.location = `mailto:${post.company_detail?.email}?subject=Apply ${post.title}`)
                }
                variant="contained"
              >
                Nộp đơn ứng tuyển qua email
              </Button>
            </div>
          ) : (
            <></>
          )}
        </section>
        <section className="body">
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={6} sm={4} md={4}>
                <Link
                  to={`/job-list/posts?keyword=&major_id=${post?.major}`}
                  className="link "
                >
                  <Item>
                    <p className="heading">Ngành nghề</p>
                    <p>{post?.major_name}</p>
                  </Item>
                </Link>
              </Grid>
              <Grid item xs={6} sm={4} md={4}>
                <Link
                  to={`/job-list/posts?keyword=&from_salary=${post?.from_salary}`}
                  className="link"
                >
                  <Item>
                    <p className="heading">Lương từ</p>
                    <p>{post?.from_salary}</p>
                  </Item>
                </Link>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <Link
                  to={`/job-list/posts?keyword=&to_salary=${post?.to_salary}`}
                  className="link"
                >
                  <Item>
                    <p className="heading">Lương đến</p>
                    <p>{post?.to_salary}</p>{" "}
                  </Item>
                </Link>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <Item>
                  <p className="heading">Giới tính</p>
                  <p>{post?.gender}</p>
                </Item>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <Link
                  to={`/job-list/posts?keyword=&location=${post?.location}`}
                  className="link"
                >
                  <Item>
                    <p className="heading">Địa điểm</p>
                    <p>{post?.location}</p>
                  </Item>
                </Link>
              </Grid>{" "}
              <Grid item xs={12} sm={4} md={4}>
                <Item>
                  <p className="heading">Số lượng</p>
                  <p>{post?.quantity}</p>
                </Item>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <Item>
                  <p className="heading">Thời gian làm việc</p>
                  <p>{post?.time_work}</p>
                </Item>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <Item>
                  <p className="heading">Trình độ</p>
                  <p>{post?.type}</p>
                </Item>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <Item>
                  <p className="heading">Ngày hết hạn</p>
                  <Moment>{post?.due}</Moment>
                </Item>
              </Grid>
            </Grid>
          </Box>
          <h2>MÔ TẢ CÔNG VIỆC</h2>
          <CkeditorHtml data={post.description} />
          {/* <h2>JOB TAGS / SKILLS</h2>
                    <Tags/> */}
          <ModalComponent
            handleOpen={handleOpen}
            open={openDialog}
            handleClose={handleClose}
          >
            <Box
              component="form"
              noValidate
              onSubmit={handleApplySubmit}
              sx={{ mt: 3 }}
            >
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Mô tả chi tiết
              </Typography>

              <TextField
                required
                name="description"
                className="search"
                fullWidth
                id="outlined-search"
              />
              <input
                className="mt-2 mb-2"
                id="raised-button-file"
                multiple
                type="file"
                ref={cvRef}
              />
              <CenterDiv>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <Button type="submit" variant="contained">
                    Nộp đơn ứng tuyển ngay
                  </Button>
                )}
              </CenterDiv>
            </Box>
          </ModalComponent>
        </section>
      </main>

      {authenticated ? <></> : <Footer />}
    </>
  );
}
