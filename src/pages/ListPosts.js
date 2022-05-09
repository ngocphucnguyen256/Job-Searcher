import React, { useEffect, useState } from 'react';
import Api, { endpoints } from '../config/Api';
import Footer from '../partials/Footer'
import Header from '../partials/Header'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import JobItem from '../components/JobItem'
import { useSearchParams } from 'react-router-dom';



export default function ListPosts() {

    const [posts, setPosts] = useState([])
    const [q] = useSearchParams()
    
    useEffect(() => {

        let loadPosts = async () => {
            let res = await Api.get(endpoints['posts'])
            setPosts(res.data)
        }
        let loadPostsParam = async () => {
            let res = await Api.get(`${endpoints['posts']}?${q.toString()}`)

            console.log(res)
            setPosts(res.data.results)
            console.log(posts)

        }
        
       if(q.toString()){
        loadPostsParam()
        console.log("param")
       }
       else{
        loadPosts()
       }
    
    }, [q])
 

  return (
    <>
        <Header/>
            <main className="search-job">
            <Container fixed>
                <Typography variant="h3" textAlign="center" gutterBottom component="h1" className="name">
                {/* {props.heading} */}
                </Typography>
                <Box sx={{ width:'100%' }}>
                <Grid container spacing={1} >
                    {posts.length?(
                        posts.map((item, index) =>
                            <Grid item xs={6} key={index} >
                                <JobItem data={item} authenticated/>
                            </Grid>
                        )
                    ):(
                        <Typography variant="h3" textAlign="center" gutterBottom component="h1" className="name">
                       Loading
                        </Typography>
                    )}
                </Grid>
            </Box>
            </Container>
            </main>
        <Footer/>
     
    </>
  );
}