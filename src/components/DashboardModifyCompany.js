import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Api, { endpoints } from "../config/Api";
import { useNavigate, useParams } from "react-router-dom";
import ModalComponent from "../components/ModalComponent";
import ImageUpload from "../components/ImageUpload";
import CenterDiv from "../components/CenterDiv";
import { UserContext } from "../App";
import { useState, useEffect } from "react";

export default function DashboardModifyCompany() {
  const [profileDetailId, setProfileDetailId] = useState(null);
  const { id } = useParams();

  let navigate = useNavigate();
  const uploadImageRef = React.useRef();

  const [open, setOpen] = React.useState(false);
  const [user, dispatch] = React.useContext(UserContext);
  const [userModifyData, setUserModifyData] = React.useState({
    company_name: "",
    description: "",
    web_url: "",
    avatar: "",
    phone: "",
    email: "",
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleGetCompanyProfile = async () => {
    const res = await Api.get(endpoints["getCompanyProfile"](id));
    console.log(res.data);
    return res.data.id;
  };

  const handleGetProfileDetails = async (profileid) => {
    const res = await Api.get(endpoints["company-detail"](profileid));
    console.log(res.data);
    setUserModifyData(res.data);
    setProfileDetailId(profileid);
  };

  useEffect(() => {
    handleGetCompanyProfile().then((profileid) => {
      handleGetProfileDetails(profileid);
    });
  }, [profileDetailId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);

    let updateUser = async () => {
      var formData = new FormData();
      // formData.append("avatar", uploadImageRef.current.files[0])
      formData.append("avatar", uploadImageRef.current.files[0]);
      formData.append("company_name", userModifyData.company_name);
      formData.append("email", userModifyData.email);
      formData.append("description", userModifyData.description);
      formData.append("web_url", userModifyData.web_url);
      formData.append("phone", userModifyData.phone);

      const res = await Api.patch(
        endpoints["company-detail"](profileDetailId),
        formData,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        }
      )
        .then((res) => {
          handleOpen();
          console.log("Res: " + res.data);
        })
        .catch((err) => {
          if (err.response.status === 400) {
            alert("Avatar required");
          }
        });
    };

    if (
      userModifyData.company_name.lenght !== 0 &&
      userModifyData.email.length !== 0
    ) {
      updateUser();
    } else {
      alert("Thông tin không được để trống");
    }
  };

  const handleLogout = () => {
    dispatch({
      type: "logout",
      payload: {
        username: "",
      },
    });
  };

  const handleSignIn = () => {
    handleLogout();
    navigate("/sign-in");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ModalComponent
          handleOpen={handleOpen}
          open={open}
          handleClose={handleClose}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Tài khoản của bạn đã cập nhật thành công
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Vui lòng đăng nhập lại
          </Typography>
          <Button
            type=""
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSignIn}
          >
            Sign In
          </Button>
        </ModalComponent>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Cập nhật thông tin nhà tuyển dụng
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="company name"
                name="companyName"
                required
                fullWidth
                id="companyName"
                label="Tên công ty"
                value={userModifyData.company_name}
                onChange={(e) => {
                  setUserModifyData({
                    ...userModifyData,
                    company_name: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="email"
                name="email"
                label="Email"
                type="email"
                autoComplete="email"
                value={userModifyData.email}
                onChange={(e) => {
                  setUserModifyData({
                    ...userModifyData,
                    email: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="description"
                label="Mô tả"
                name="description"
                autoComplete="description"
                value={userModifyData.description}
                onChange={(e) => {
                  setUserModifyData({
                    ...userModifyData,
                    description: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="webUrl"
                type="url"
                name="webUrl"
                label="Website"
                autoComplete="webUrl"
                value={userModifyData.web_url}
                onChange={(e) => {
                  setUserModifyData({
                    ...userModifyData,
                    web_url: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="phone"
                type="number"
                name="phone"
                label="Số điên thoại"
                autoComplete="phone"
                value={userModifyData.phone}
                onChange={(e) => {
                  setUserModifyData({
                    ...userModifyData,
                    phone: e.target.value,
                  });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography align="center">Avatar</Typography>
            </Grid>

            <Grid item xs={12}>
              <CenterDiv>
                <ImageUpload cardName="Input Image" ref={uploadImageRef} />
              </CenterDiv>
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Cập nhật
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
