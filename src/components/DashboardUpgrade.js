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
import ModalComponent from "../components/ModalComponent";
import ImageUpload from "../components/ImageUpload";
import CenterDiv from "../components/CenterDiv";

export default function DashboardUpgrade() {
  const uploadImageRef = React.useRef();

  const [open, setOpen] = React.useState(false);
  const [userUpgradeData, setUserUpgradeData] = React.useState({
    companyName: "",
    description: "",
    webUrl: "",
    avatar: "",
    phone: "",
    email: "",
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    let updateUser = async () => {
      var formData = new FormData();

      formData.append("avatar", uploadImageRef.current.files[0]);
      formData.append("company_name", userUpgradeData.companyName);
      formData.append("email", userUpgradeData.email);
      formData.append("description", userUpgradeData.description);
      formData.append("web_url", userUpgradeData.webUrl);
      formData.append("phone", userUpgradeData.phone);

      const res = await Api.post(endpoints["hirer"], formData, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      })
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
      userUpgradeData.companyName.lenght !== 0 &&
      userUpgradeData.email.length !== 0
    ) {
      updateUser();
    } else {
      alert("Thông tin không được để trống");
    }
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
            Tài khoản của bạn đã đăng ký nâng cấp nhà tuyển dụng thành công. Vui
            lòng chờ quản trị viên xét duyệt.
          </Typography>
        </ModalComponent>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Nâng cấp tài khoản thành nhà tuyển dụng
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="company-name"
                name="companyName"
                required
                fullWidth
                id="companyName"
                label="Tên công ty"
                autoFocus
                value={userUpgradeData.companyName}
                onChange={(e) => {
                  setUserUpgradeData({
                    ...userUpgradeData,
                    companyName: e.target.value,
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
                value={userUpgradeData.email}
                onChange={(e) => {
                  setUserUpgradeData({
                    ...userUpgradeData,
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
                value={userUpgradeData.description}
                onChange={(e) => {
                  setUserUpgradeData({
                    ...userUpgradeData,
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
                value={userUpgradeData.webUrl}
                onChange={(e) => {
                  setUserUpgradeData({
                    ...userUpgradeData,
                    webUrl: e.target.value,
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
                value={userUpgradeData.phone}
                onChange={(e) => {
                  setUserUpgradeData({
                    ...userUpgradeData,
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
