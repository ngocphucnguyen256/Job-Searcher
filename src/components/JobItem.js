import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import EditLocationIcon from "@mui/icons-material/EditLocation";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Api, { endpoints } from "../config/Api";
import { useNavigate } from "react-router-dom";

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "grey.100",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        border: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.300",
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
        textDecoration: "none !important",
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default function JobItem(props) {
  let navigate = useNavigate();

  const data = props.data;

  let url = `/job-detail/${data.id}`;

  if (props.authenticated) {
    url = `/dashboard/job-detail/${data.id}`;
  }

  const handleDelete = async () => {
    const res = await Api.delete(endpoints["myPostDelete"](data.id), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res);
    if (res.status === 204) {
      alert("Post deleted successfully");
    } else {
      alert("Something went wrong");
    }
    props.handleDelete();
  };

  const handleModify = async () => {
    navigate(`/dashboard/job-detail/${data.id}/modify`);
  };

  return (
    <div className="flex-grow" style={{ width: "100%" }}>
      <Link to={url} className="link">
        <Box
          className="job-item"
          sx={{
            display: "flex",
            p: 1,
            bgcolor: "background.paper",
            borderRadius: 1,
          }}
        >
          <Item>
            <img className="job-item-img" src={data?.avatar_company} alt="1" />
          </Item>
          <Item sx={{ flexGrow: 1 }}>
            <div className="job-item-name">
              <Typography
                noWrap
                variant="h5"
                className="title"
                gutterBottom
                component="h5"
              >
                {data?.title}
              </Typography>
            </div>
            <Typography
              variant="body1"
              className="company"
              gutterBottom
              component="div"
            >
              Công ty: {data?.company_detail?.company_name}
            </Typography>
            <Typography
              variant="body1"
              className="location"
              gutterBottom
              component="div"
            >
              Ngành nghề: {data?.major_name}
            </Typography>
            <div className="flex">
              <AttachMoneyIcon />
              {data.from_salary ? (
                <Typography
                  variant="body1"
                  className="price"
                  gutterBottom
                  component="div"
                >
                  Lương:{" "}
                  {String(data?.from_salary).replace(
                    /(.)(?=(\d{3})+$)/g,
                    "$1."
                  )}{" "}
                  -{" "}
                  {String(data?.to_salary).replace(/(.)(?=(\d{3})+$)/g, "$1.")}
                </Typography>
              ) : (
                <Typography
                  variant="body1"
                  className="price"
                  gutterBottom
                  component="div"
                >
                  Lương: Thỏa thuận
                </Typography>
              )}
            </div>

            <div className="flex">
              <EditLocationIcon />
              <Typography
                variant="body1"
                className="location"
                gutterBottom
                component="div"
              >
                {data?.location}
              </Typography>
            </div>
            <Typography
              variant="body1"
              className="location"
              gutterBottom
              component="div"
            >
              Trình độ: {data?.type}
            </Typography>
          </Item>
        </Box>
      </Link>
      {props.authenticated ? (
        <>
          <Button variant="" onClick={handleModify}>
            Sửa
          </Button>
          <Button variant="contained" onClick={handleDelete}>
            Xóa
          </Button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
