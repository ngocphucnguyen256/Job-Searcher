import React, { useEffect, useState } from 'react';
import Api, { endpoints } from '../config/Api';
import Footer from '../partials/Footer'
import Header from '../partials/Header'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import JobItem from '../components/JobItem'



export default function ListPosts(props) {

    const data=props.data


  return (
    <>
        <Header/>
            <main className="search-job">
            <Container fixed>
                <Typography variant="h3" textAlign="center" gutterBottom component="h1" className="name">
                {props.heading}
                </Typography>
                <Box sx={{ width:'100%' }}>
                <Grid container spacing={1} >
                    {data.map((item, index) =>
                    <Grid item xs={6} key={index} >
                        <JobItem data={item} authenticated/>
                    </Grid>
                )}
                </Grid>
            </Box>
            </Container>
            </main>
        <Footer/>
     
    </>
  );
}