import React, { useEffect, useState } from 'react';
import Api, { endpoints } from '../config/Api';
import Footer from '../partials/Footer'
import Header from '../partials/Header'
import Tags from '../components/Tags'
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';


export default function SearchJobs(props) {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        let loadCategories = async () => {
            let res = await Api.get(endpoints['categories'])
            setCategories(res.data)
        }
        
        loadCategories()
    
    }, [])



  return (
    <>
        <Header/>
            <main className="search-job">
            <Container fixed>
                <section className="header">
                <Typography variant="h1" component="h1" className="heading">All Job Categories</Typography>
                </section>
                <section className="body">
                    <Tags data={categories}/>
                </section>
            </Container>
            </main>
        <Footer/>
     
    </>
  );
}