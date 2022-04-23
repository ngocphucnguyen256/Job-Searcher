import {useState, useEffect} from 'react'
import Dashboard from '../pages/Dashboard';
import Typography from '@mui/material/Typography';
import Api, { endpoints } from '../config/Api';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import JobItem from './JobItem'

const DashboardPost = () => {

    const [posts, setPosts] = useState([])

    //can them filter user
    useEffect(() => {
    let loadPosts = async () => {
        let res = await Api.get(endpoints['posts'])
        setPosts(res.data.results)
    }
    
    loadPosts()

}, [])


    return(
        <Dashboard>
            <Typography variant="h3" textAlign="center" gutterBottom component="h1" className="name">
            Các bài viết đã đăng
            </Typography>
            <Box sx={{ width:'100%' }}>
            <Grid container spacing={1} >
                  {posts.map((item, index) =>
                  <Grid item xs={6} key={index} >
                      <JobItem data={item} authenticated/>
                  </Grid>
              )}
            </Grid>
          </Box>
        </Dashboard>
    )


}


export default DashboardPost