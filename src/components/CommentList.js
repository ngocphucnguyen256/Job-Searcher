import { useState, useContext, useEffect } from "react";
import { UserContext } from "../App";
import CommentItem from "./CommentItem";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const CommentList = (props) => {
  const [user, dispatch] = useContext(UserContext);

  return (
    <div className="comment-list">
      <Typography variant="h2" textAlign="left" component="h2">
        Bình luận
      </Typography>
      {user && user.role === "User" ? (
        <div className="fl">
          <Box
            sx={{
              width: "90%",
            }}
          >
            <TextField
              fullWidth
              label="Viết bình luận"
              onChange={(e) => {
                props.setComment(e.target.value);
              }}
              value={props.comment}
              id="fullWidth"
            />
          </Box>
          <Button
            size="large"
            variant="contained"
            onClick={props.handlePostComment}
            endIcon={<SendIcon />}
          >
            Gửi
          </Button>
        </div>
      ) : (
        <></>
      )}

      {props.data && props.data.length >= 0 ? (
        props.data.map((item, index) => (
          <CommentItem
            key={index}
            data={item}
            getComments={props.getComments}
          />
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default CommentList;
