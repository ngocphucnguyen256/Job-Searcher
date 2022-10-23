import CkeditorComponent from "./CkeditorComponent";
import Button from "@mui/material/Button";
import SeclectGroup from "./SelectGroup";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import SelectComponent from "./SelectComponent";
import Api, { endpoints } from "../config/Api";
import React, { useEffect, useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import { location, salary, level } from "../data/data";
import { UserContext } from "../App";
import DatePicker from "./DatePicker";
import ModalComponent from "../components/ModalComponent";

const PostComponent = () => {
  const [categories, setCategories] = useState([]);
  const [dataCkeditor, setDataCkeditor] = useState("");
  const [dataMajorId, setDataMajorId] = useState(null);
  const [user, dispatch] = useContext(UserContext);
  const [dateValue, setDateValue] = useState(new Date());
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    let loadCategories = async () => {
      let res = await Api.get(endpoints["categories"]);
      setCategories(res.data);
    };

    loadCategories();
  }, []);

  const handleOpen = () => setOpenDialog(true);
  const handleClose = () => setOpenDialog(false);

  let from_salary, to_salary;

  const convertSalary = (string) => {
    let arr = string.split(",");
    if (arr.length === 1) {
      let salaryIndex = salary.findIndex((item) => item.name === string);
      from_salary = salary[salaryIndex].data;
    } else {
      let salaryIndex = salary.findIndex((item) => item.name === arr[0]);
      let salaryIndex2 = salary.findIndex((item) => item.name === arr[1]);
      from_salary = salary[salaryIndex].data;
      to_salary = salary[salaryIndex2].data;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("salary")) {
      convertSalary(data.get("salary"));
    }

    console.log({
      title: data.get("title"),
      major: dataMajorId,
      location: data.get("location"),
      from_salary: from_salary,
      to_salary: to_salary,
      type: data.get("type"),
      time_work: data.get("timeWork"),
      gender: data.get("gender"),

      description: dataCkeditor,
      quantity: data.get("quantity"),
      due: `${dateValue.getFullYear()}-${
        dateValue.getMonth() + 1
      }-${dateValue.getDate()}`,
    });

    const postPost = async () => {
      let res = await Api.post(
        endpoints["posts"],
        {
          title: data.get("title"),
          major: dataMajorId,
          location: data.get("location"),
          from_salary: from_salary,
          to_salary: to_salary,
          type: data.get("type"),
          time_work: data.get("timeWork"),
          gender: data.get("gender"),

          description: dataCkeditor,
          quantity: data.get("quantity"),
          due: dateValue,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
        .then(function (response) {
          handleOpen();
        })
        .catch((err) => alert(err));
    };
    if (
      data.get("title") &&
      data.get("location") &&
      data.get("type") &&
      dataMajorId &&
      dataCkeditor &&
      user.id &&
      data.get("timeWork")
    ) {
      postPost();
    } else {
      alert("Hãy nhập đủ các trường");
    }
  };

  return (
    <div className="post-component">
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 1, md: 3 }}>
            <Grid item xs={12} sm={6} md={4} m={1}>
              <div>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="h6"
                  className="name"
                >
                  Vị trí cần tuyển
                </Typography>
                <TextField
                  required
                  name="title"
                  className="search"
                  fullWidth
                  id="outlined-search"
                  label="Chức danh"
                  type="search"
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4} m={1}>
              <div>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="h6"
                  className="name"
                >
                  Chọn ngành nghề cần tuyển
                </Typography>
                <SeclectGroup
                  required
                  name="major"
                  data={categories}
                  setDataMajorId={setDataMajorId}
                  fullWidth
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <div>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="h6"
                  className="name"
                >
                  Chọn nơi làm việc
                </Typography>
                <SelectComponent
                  required
                  name="location"
                  data={location}
                  fullWidth
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <div>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="h6"
                  className="name"
                >
                  Chọn mức lương
                </Typography>
                <SelectComponent
                  label="Chọn mức lương"
                  name="salary"
                  data={salary}
                  fullWidth
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <div>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="h6"
                  className="name"
                >
                  Chọn cấp bậc
                </Typography>
                <SelectComponent
                  required
                  label="Cấp bậc"
                  name="type"
                  data={level}
                  fullWidth
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4} m={1}>
              <div>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="h6"
                  className="name"
                >
                  Thời gian làm việc
                </Typography>
                <TextField
                  required
                  name="timeWork"
                  className="search"
                  fullWidth
                  id="outlined-search"
                  label="Thời gian làm việc"
                />
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={4} m={1}>
              <div>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="h6"
                  className="name"
                >
                  Giới tính
                </Typography>
                <TextField
                  name="gender"
                  className="search"
                  fullWidth
                  id="outlined-search"
                  label="Giới tính"
                />
              </div>
            </Grid>

            <Grid item xs={12} sm={6} md={4} m={1}>
              <div>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="h6"
                  className="name"
                >
                  Số lượng
                </Typography>
                <TextField
                  type="number"
                  name="quantity"
                  className="search"
                  fullWidth
                  id="outlined-search"
                  label="Số lượng"
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} md={4} m={1}>
              <div>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="h6"
                  className="name"
                >
                  Ngày hết hạn
                </Typography>
                <DatePicker value={dateValue} setDateValue={setDateValue} />
              </div>
            </Grid>
          </Grid>
        </Box>

        <Typography
          variant="h6"
          gutterBottom
          component="h6"
          className="name ml-2-i"
        >
          Mô tả chi tiết
        </Typography>

        <CkeditorComponent name="detail" setDataCkeditor={setDataCkeditor} />
        <div className="center-div">
          <Button className="post" variant="contained" type="submit">
            Đăng ngay
          </Button>
        </div>
        <ModalComponent
          handleOpen={handleOpen}
          open={openDialog}
          handleClose={handleClose}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Đăng bài thành công
          </Typography>
        </ModalComponent>
      </Box>
    </div>
  );
};

export default PostComponent;
