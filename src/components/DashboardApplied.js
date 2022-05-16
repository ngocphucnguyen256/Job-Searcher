import Typography from '@mui/material/Typography';
import { UserContext } from '../App'
import  { useState, useContext, useEffect } from 'react'
import img from '../images/404.jpg';
import Api, { endpoints } from '../config/Api';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import JobItem from './JobItem'




const DashboardApplied = () => {
  const [user, dispatch] = useContext(UserContext)
  const [openDialog, setOpenDialog] = useState(false);
  let navigate = useNavigate();

  console.log(user)

  const handleOpen = () => setOpenDialog(true);
  const handleClose = () => setOpenDialog(false);


  let loadApplied= async () => {
    const res = await Api.get(endpoints['my-applies'],
    { headers:{
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }})
    console.log(res.data)
}

    
    useEffect(() => {
        loadApplied()
    
    }, [])


    return (
        <div className="dashboard-Applied">
        <Typography variant="h3" textAlign="center" gutterBottom component="h1" className="name">
            Các việc làm đã ứng tuyển
            </Typography>
            <Box sx={{ width:'100%' }}>
            <Grid container spacing={1} >
                {/* {posts.length>0?(
                    posts.map((item, index) =>
                        <Grid item xs={6} key={index} >
                            <JobItem handleDelete={handleDelete} data={item} authenticated/>
                        </Grid>
                    )
                ):(
                    <p>Khong co ket qua</p>
                )} */}
            </Grid>
          </Box>

        </div>
    )
}


export default DashboardApplied