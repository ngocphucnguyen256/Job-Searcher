import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Api, { endpoints } from "../config/Api";
import { useNavigate } from "react-router-dom";
import ModalComponent from "../components/ModalComponent";
import ImageUpload from "../components/ImageUpload";
import CenterDiv from "../components/CenterDiv";
import CircularProgress from "@mui/material/CircularProgress";

export default function SignUp() {
  let navigate = useNavigate();

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const avatar = React.useRef();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSignIn = () => {
    navigate("/sign-in");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let createUser = async () => {
      var formData = new FormData();
      formData.append("avatar", avatar.current.files[0]);
      formData.append("first_name", data.get("firstName"));
      formData.append("last_name", data.get("lastName"));
      formData.append("username", data.get("username"));
      formData.append("email", data.get("email"));
      formData.append("password", data.get("password"));

      let res = await Api.post(endpoints["users"], formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((res) => {
          handleOpen();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            alert("Tên đăng nhập hoặc email đã tồn tại");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    };

    if (
      avatar.current.files[0] &&
      data.get("firstName") &&
      data.get("lastName") &&
      data.get("email") &&
      data.get("password")
    ) {
      setLoading(true);
      createUser();
    } else {
      alert("Hãy nhập đủ các trường");
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
            Tài khoản của bạn đã đăng kí thành công
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Bạn có thể đăng nhập ngay bây giờ
          </Typography>
          <Button
            type=""
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSignIn}
          >
            Đăng nhập ngay
          </Button>
        </ModalComponent>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Đăng ký tài khoản
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="Họ"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Tên"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Địa chỉ email"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Tên đăng nhập"
                name="username"
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography align="center">Ảnh đại diện</Typography>
            </Grid>

            <Grid item xs={12}>
              <CenterDiv>
                <ImageUpload cardName="Input Image" ref={avatar} />
              </CenterDiv>
            </Grid>
          </Grid>
          <CenterDiv>
            {loading ? (
              <CircularProgress />
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Đăng ký
              </Button>
            )}
          </CenterDiv>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/sign-in" variant="body2">
                Bạn đã có tài khoản? Đăng nhập ngay
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
