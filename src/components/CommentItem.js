import {  Avatar, Grid, Paper } from "@material-ui/core";
import Moment from 'react-moment';


const CommentItem = (props) => {
    const data = props.data
    return (
        <Paper style={{ padding: "40px 20px", marginTop: 20 }}>
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <Avatar alt="Remy Sharp" src={data.image} />
                </Grid>
                <Grid justifyContent="left" item xs zeroMinWidth>
                    <h4 style={{ margin: 0, textAlign: "left" }}>{data.name}</h4>
                    <p style={{ textAlign: "left" }}>
                        {data.content}{" "}
                    </p>
                    <p style={{ textAlign: "left", color: "gray" }}>
                    <Moment toNow>{data.time}</Moment>
                    </p>
                </Grid>
            </Grid>
      </Paper>
    )
}

export default CommentItem

