import {  Avatar, Grid, Paper } from "@material-ui/core";
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { UserContext } from '../App'
import  { useState, useContext, useEffect } from 'react'
import Api, { endpoints } from '../config/Api';



const CommentItem = (props) => {
    const [user, dispatch] = useContext(UserContext)

    const data = props.data
    // console.log(data)


   const  handleDeleteComment= async () => {
        const res = await Api.delete(endpoints['comment-detail'](data.id)
        ,{
            headers: {
              'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
      
          })

        props.getComments()

    }


    return (
        <Paper style={{ padding: "40px 20px", marginTop: 20 }}>
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <Avatar alt="Remy Sharp" src={data.avatar_user} />
                </Grid>
                <Grid  item xs zeroMinWidth>
                    <Typography variant="h4" textAlign="left" gutterBottom component="div" className="name">
                    {data.name_user}
                    </Typography>
                    <p style={{ textAlign: "left" }}>
                        {data.content}{" "}
                    </p>
                    {/* <p style={{ textAlign: "left", color: "gray" }}>
                    <Moment toNow>{data.time}</Moment>
                    </p> */}
                </Grid>
                {
                    data.creator===user.id&&
                    <Button size="large" variant="contained" onClick={handleDeleteComment} >
                    Delete Comment
                     </Button>
                }
             
            </Grid>
      </Paper>
    )
}

export default CommentItem

