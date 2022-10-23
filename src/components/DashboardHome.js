import Typography from "@mui/material/Typography";
import CenterDiv from "../components/CenterDiv";
import ModalComponent from "../components/ModalComponent";
import Avatar from "@mui/material/Avatar";
import { UserContext } from "../App";
import { useState, useContext } from "react";
import img from "../images/404.jpg";
import Api, { endpoints } from "../config/Api";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const DashboardHome = () => {
  const [user, dispatch] = useContext(UserContext);
  const [openDialog, setOpenDialog] = useState(false);
  let navigate = useNavigate();

  console.log(user);

  const handleOpen = () => setOpenDialog(true);
  const handleClose = () => setOpenDialog(false);

  const toUpdateRole = () => {
    navigate(`/dashboard/upgrade/`, { replace: true });
  };

  const handleModifyUser = () => {
    navigate(`/dashboard/modify/${user.id}`, { replace: true });
  };

  const handleModifyCompany = () => {
    navigate(`/dashboard/modify-company/${user.id}`, { replace: true });
  };

  return (
    <div className="dashboard-home">
      <CenterDiv>
        {user.avatar ? (
          <Avatar
            alt="Remy Sharp"
            src={user.avatar}
            sx={{ width: 170, height: 170 }}
          />
        ) : (
          <Avatar alt="Remy Sharp" src={img} sx={{ width: 170, height: 170 }} />
        )}
      </CenterDiv>

      <Typography
        variant="h5"
        textAlign="center"
        gutterBottom
        component="div"
        className="name"
      >
        Họ: {user.firstname}
      </Typography>
      <Typography
        variant="h5"
        textAlign="center"
        gutterBottom
        component="div"
        className="name"
      >
        Tên: {user.lastname}
      </Typography>
      <Typography
        variant="h5"
        textAlign="center"
        gutterBottom
        component="div"
        className="name"
      >
        Tên đăng nhập: {user.username}
      </Typography>
      <Typography
        variant="h5"
        textAlign="center"
        gutterBottom
        component="div"
        className="name"
      >
        ({user.role})
      </Typography>
      <Typography
        variant="h5"
        textAlign="center"
        gutterBottom
        component="div"
        className="name"
      >
        Email: {user.email}
      </Typography>

      {user.role === "User" ? (
        <>
          <CenterDiv>
            <Button variant="contained" color="primary" onClick={toUpdateRole}>
              Nâng cấp tài khoản thành nhà tuyển dụng
            </Button>
          </CenterDiv>
          <Typography
            variant="h5"
            textAlign="center"
            gutterBottom
            component="div"
            className="name"
          ></Typography>
        </>
      ) : (
        <></>
      )}
      <CenterDiv>
        <Button variant="contained" color="primary" onClick={handleModifyUser}>
          Thay đổi thông tin tài khoản
        </Button>
      </CenterDiv>
      {user.role === "Hirer" ? (
        <>
          <Typography
            variant="h5"
            textAlign="center"
            gutterBottom
            component="div"
            className="name"
          ></Typography>
          <CenterDiv className="mt-2">
            <Button
              variant="contained"
              color="primary"
              onClick={handleModifyCompany}
            >
              Thay đổi thông tin công ty
            </Button>
          </CenterDiv>

          <Typography
            variant="h5"
            textAlign="center"
            gutterBottom
            component="div"
            className="name"
          ></Typography>
        </>
      ) : (
        <></>
      )}

      <ModalComponent
        handleOpen={handleOpen}
        open={openDialog}
        handleClose={handleClose}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Tài khoản của bạn đã đăng kí nâng cấp nhà tuyển dụng
        </Typography>
      </ModalComponent>
    </div>
  );
};

export default DashboardHome;
