import { Avatar, Grid, Paper } from "@material-ui/core";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { UserContext } from "../App";
import { useContext } from "react";
import Api, { endpoints } from "../config/Api";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import DeleteIcon from "@mui/icons-material/Delete";

const CommentItem = (props) => {
  const [user] = useContext(UserContext);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("xs"));
  const data = props.data;

  const handleDeleteComment = async () => {
    const res = await Api.delete(endpoints["comment-detail"](data.id), {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).catch((err) => console.log(err));
    props.getComments(data.company);
  };

  return (
    <Paper className="comment-item">
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          {/* <Link to={`/profile/${data.creator}`} className="link"> */}
          <Avatar alt="Remy Sharp" src={data.avatar_user} />
          {/* </Link> */}
        </Grid>
        <Grid item xs zeroMinWidth>
          {/* <Link to={`/profile/${data.creator}`} className="link"> */}
          <Typography
            variant="h4"
            textAlign="left"
            gutterBottom
            component="div"
            className="name"
          >
            {data.name_user}
          </Typography>
          {/* </Link> */}

          <p style={{ textAlign: "left" }}>{data.content} </p>
          {/* <p style={{ textAlign: "left", color: "gray" }}>
                    <Moment toNow>{data.time}</Moment>
                    </p> */}
        </Grid>
        {user && data.creator === user.id && (
          <Button
            size={`${matches ? "small" : "large"}`}
            variant="contained"
            onClick={handleDeleteComment}
            endIcon={<DeleteIcon />}
          >
            Xóa
          </Button>
        )}
      </Grid>
    </Paper>
  );
};

export default CommentItem;
