import * as React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Api, { endpoints } from "../config/Api";
import { useNavigate } from "react-router-dom";
import Moment from "react-moment";
import EditIcon from "@mui/icons-material/Edit";
import ModalComponent from "../components/ModalComponent";
import Grid from "@mui/material/Grid";
import DatePicker from "./DatePicker";
import TextField from "@mui/material/TextField";
import SeclectGroup from "./SelectGroup";

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

export default function ProfileItem(props) {
  const [data, setData] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogAdd, setOpenDialogAdd] = useState(false);
  const [startDateValue, setStartDateValue] = useState(new Date());
  const [endDateValue, setEndDateValue] = useState(new Date());
  const [startDateValueAdd, setStartDateValueAdd] = useState(new Date());
  const [endDateValueAdd, setEndDateValueAdd] = useState(new Date());
  const [dataMajorId, setDataMajorId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [modified, setModified] = useState(null);

  const handleOpen = () => setOpenDialog(true);
  const handleClose = () => setOpenDialog(false);

  const handleOpenAdd = () => setOpenDialogAdd(true);
  const handleCloseAdd = () => setOpenDialogAdd(false);

  const handleDeleteEducation = async (id) => {
    const res = await Api.delete(endpoints["educationDetail"](id), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res);
    if (res.status === 204) {
      alert("Xóa thành công");
    } else {
      alert("Có lỗi xảy ra");
    }
    props.handleDelete();
  };

  useEffect(() => {
    let loadCategories = async () => {
      let res = await Api.get(endpoints["categories"]);
      setCategories(res.data);
    };
    loadCategories();
    setData(props.data);
  }, [props]);

  const handleAddItemClick = async () => {
    setModified({
      university_name: "",
      degree_name: "",
      CPA: "",
    });
    setDataMajorId("");
    handleOpenAdd();
  };

  const formatDate = (date) => {
    return (
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    );
  };

  const handleAddSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const postDataSubmt = async () => {
      const res = await Api.post(
        endpoints["education"],

        {
          degree_name: formData.get("degree_name"),
          university_name: formData.get("university_name"),
          major: dataMajorId,
          completionDate:
            endDateValueAdd.getDate || endDateValueAdd.includes("GTM")
              ? formatDate(endDateValueAdd)
              : endDateValueAdd,
          CPA: formData.get("CPA"),
          start_date:
            startDateValueAdd.getDate || startDateValueAdd.includes("GTM")
              ? formatDate(startDateValueAdd)
              : startDateValueAdd,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
        .then(function (response) {
          alert("Thêm thành công");
          handleCloseAdd();
          props.handleDelete();
        })
        .catch((err) => alert(err));

      console.log(res);
    };

    if (
      formData.get("degree_name") &&
      formData.get("university_name") &&
      dataMajorId &&
      formData.get("CPA")
    ) {
      postDataSubmt();
    } else {
      alert("Hãy nhập đủ các trường");
    }
  };

  const handleModify = async (item) => {
    setModified(item);
    setStartDateValue(item.start_date);
    setEndDateValue(item.completionDate);
    setDataMajorId(item.major);

    handleOpen();
  };

  const handleModifySubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const postData = async () => {
      const res = await Api.patch(
        endpoints["educationDetail"](modified.id),
        {
          degree: formData.get("degree_name"),
          university: formData.get("university_name"),
          major_id: dataMajorId,
          completed_date: endDateValue,
          CPA: formData.get("CPA"),
          start_date: startDateValue,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
        .then(function (response) {
          alert("Cập nhập thành công");
          handleClose();
          props.handleDelete();
        })
        .catch((err) => alert(err));

      console.log(res);
    };

    if (
      formData.get("degree_name") &&
      formData.get("university_name") &&
      dataMajorId &&
      formData.get("CPA")
    ) {
      postData();
    } else {
      alert("Hãy nhập đủ các trường");
    }
  };

  return (
    <div className="flex-grow" style={{ width: "100%" }}>
      <Typography variant="h2" textAlign="left" component="h2">
        Thông tin học vấn
      </Typography>
      <Box
        sx={{
          display: "flex",
          p: 1,
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        <Grid container spacing={1}>
          {data && data.length > 0 ? (
            data.map((item, index) => (
              <Grid item xs={12} sm={6} md={6} key={index}>
                <Item>
                  <Typography
                    variant="h5"
                    textAlign="center"
                    gutterBottom
                    component="div"
                    className="name"
                  >
                    Tên trường học: {item?.university_name}
                  </Typography>
                  <Typography
                    variant="h5"
                    textAlign="center"
                    gutterBottom
                    component="div"
                    className="name"
                  >
                    Bằng cấp: {item?.degree_name}
                  </Typography>
                  <Typography
                    variant="h5"
                    textAlign="center"
                    gutterBottom
                    component="div"
                    className="name"
                  >
                    Ngành nghề: {item?.major}
                  </Typography>
                  <Typography
                    variant="h5"
                    textAlign="center"
                    gutterBottom
                    component="div"
                    className="name"
                  >
                    CPA: {item?.CPA}
                  </Typography>
                  <Typography
                    variant="h5"
                    textAlign="center"
                    gutterBottom
                    component="div"
                    className="name"
                  >
                    Ngày bắt đầu: <Moment>{item?.start_date}</Moment>
                  </Typography>
                  <Typography
                    variant="h5"
                    textAlign="center"
                    gutterBottom
                    component="div"
                    className="name"
                  >
                    Ngày kết thúc:<Moment>{item?.completionDate}</Moment>
                  </Typography>
                  {props.authenticated ? (
                    <>
                      <Button
                        variant="contained"
                        className="mr-2-i"
                        onClick={() => handleModify(item)}
                        endIcon={<EditIcon />}
                      >
                        Sửa
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => handleDeleteEducation(item.id)}
                      >
                        Xóa
                      </Button>
                    </>
                  ) : (
                    <></>
                  )}
                </Item>
              </Grid>
            ))
          ) : (
            <></>
          )}
          {props.authenticated ? (
            <>
              <Grid item xs={12} sm={6} md={6}>
                <Item>
                  <Button variant="contained" onClick={handleAddItemClick}>
                    Thêm
                  </Button>
                </Item>
              </Grid>
            </>
          ) : (
            <></>
          )}
        </Grid>
        <ModalComponent
          handleOpen={handleOpen}
          open={openDialog}
          handleClose={handleClose}
        >
          <Box
            sx={{ flexGrow: 1 }}
            component="form"
            onSubmit={handleModifySubmit}
          >
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={12} sm={4} md={4}>
                <div>
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="div"
                    className="name"
                  >
                    Tên trường
                  </Typography>
                  <TextField
                    required
                    name="university_name"
                    className="search"
                    fullWidth
                    id="outlined-search"
                    type="search"
                    value={modified?.university_name}
                    onChange={(e) => {
                      setModified({
                        ...modified,
                        university_name: e.target.value,
                      });
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <div>
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="div"
                    className="name"
                  >
                    Tên bằng cấp
                  </Typography>
                  <TextField
                    required
                    name="degree_name"
                    className="search"
                    fullWidth
                    id="outlined-search"
                    type="search"
                    value={modified?.degree_name}
                    onChange={(e) => {
                      setModified({ ...modified, degree_name: e.target.value });
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <div>
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="div"
                    className="name"
                  >
                    Chọn ngành nghề
                  </Typography>
                  <SeclectGroup
                    required
                    name="major"
                    data={categories}
                    setDataMajorId={setDataMajorId}
                  />
                </div>
              </Grid>

              <Grid item xs={12} sm={4} md={4}>
                <div>
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="div"
                    className="name"
                  >
                    CPA
                  </Typography>
                  <TextField
                    type="number"
                    value={modified?.CPA}
                    onChange={(e) => {
                      setModified({ ...modified, CPA: e.target.value });
                    }}
                    name="CPA"
                    className="search"
                    fullWidth
                    id="outlined-search"
                  />
                </div>
              </Grid>
              <Grid item xs={6} sm={4} md={4}>
                <div>
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="div"
                    className="name"
                  >
                    Ngày bắt đầu
                  </Typography>
                  <DatePicker
                    value={startDateValue}
                    setDateValue={setStartDateValue}
                  />
                </div>
              </Grid>
              <Grid item xs={6} sm={4} md={4}>
                <div>
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="div"
                    className="name"
                  >
                    Ngày kết thúc
                  </Typography>
                  <DatePicker
                    value={endDateValue}
                    setDateValue={setEndDateValue}
                  />
                </div>
              </Grid>
            </Grid>
            <Button type="submit" variant="contained">
              Lưu
            </Button>
          </Box>
        </ModalComponent>

        <ModalComponent
          handleOpen={handleOpenAdd}
          open={openDialogAdd}
          handleClose={handleCloseAdd}
        >
          <Box sx={{ flexGrow: 1 }} component="form" onSubmit={handleAddSubmit}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item xs={12} sm={4} md={6}>
                <div>
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="div"
                    className="name"
                  >
                    Tên trường
                  </Typography>
                  <TextField
                    required
                    name="university_name"
                    className="search"
                    fullWidth
                    id="outlined-search"
                    type="search"
                    value={modified?.university_name}
                    onChange={(e) => {
                      setModified({
                        ...modified,
                        university_name: e.target.value,
                      });
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={4} md={6}>
                <div>
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="div"
                    className="name"
                  >
                    Tên bằng cấp
                  </Typography>
                  <TextField
                    required
                    name="degree_name"
                    className="search"
                    fullWidth
                    id="outlined-search"
                    type="search"
                    value={modified?.degree_name}
                    onChange={(e) => {
                      setModified({ ...modified, degree_name: e.target.value });
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={4} md={6}>
                <div>
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="div"
                    className="name"
                  >
                    Chọn ngành nghề
                  </Typography>
                  <SeclectGroup
                    required
                    name="major"
                    data={categories}
                    setDataMajorId={setDataMajorId}
                  />
                </div>
              </Grid>

              <Grid item xs={12} sm={4} md={6}>
                <div>
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="div"
                    className="name"
                  >
                    CPA
                  </Typography>
                  <TextField
                    type="number"
                    value={modified?.CPA}
                    onChange={(e) => {
                      setModified({ ...modified, CPA: e.target.value });
                    }}
                    name="CPA"
                    className="search"
                    fullWidth
                    id="outlined-search"
                  />
                </div>
              </Grid>
              <Grid item xs={2} sm={4} md={6}>
                <div>
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="div"
                    className="name"
                  >
                    Ngày bắt đầu
                  </Typography>
                  <DatePicker
                    value={startDateValueAdd}
                    setDateValue={setStartDateValueAdd}
                  />
                </div>
              </Grid>
              <Grid item xs={2} sm={4} md={6} mb={2}>
                <div>
                  <Typography
                    variant="h6"
                    gutterBottom
                    component="div"
                    className="name"
                  >
                    Ngày kết thúc
                  </Typography>
                  <DatePicker
                    value={endDateValueAdd}
                    setDateValue={setEndDateValueAdd}
                  />
                </div>
              </Grid>
            </Grid>
            <Button type="submit" variant="contained">
              Lưu
            </Button>
          </Box>
        </ModalComponent>
      </Box>
    </div>
  );
}
