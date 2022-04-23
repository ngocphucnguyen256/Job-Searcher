import Footer from '../partials/Footer'
import Header from '../partials/Header'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CkeditorHtml from '../components/CkeditorHtml';
import Item from '../components/Item';
import Tags from '../components/Tags'
import CommentList from '../components/CommentList';
import { useParams  } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Api, { endpoints } from '../config/Api';

export default function JobDetails(props) {

    const { id } = useParams();

    const [post, setPost] = useState(null)
    const [applies, setApplies] = useState(null)

    const loadPostAppliessById = async () => {
        const res = await Api.get(endpoints['post-detail-applies'](id))
        console.log(res.data)
        setApplies(res.data)

    }


    useEffect(() => {
        const loadPostDetailsById = async () => {
            const res = await Api.get(endpoints['post-detail'](id))
            setPost(res.data)

        }
        
        loadPostDetailsById()
        
        if(props.authenticated){

            
            loadPostAppliessById()
        
       }

    }, [])





    if(!post) {
        return <div>Loading...</div>
    }

  return (
    <>
        <Header/>
            <main className="job-detail">
                <section className="header">
                    <h1>{post.title}</h1>
                    <h2>{post.company}</h2>
                    {props.authenticated?(<></>):(
                        <Button variant="contained">Nộp đơn ứng tuyển ngay</Button>
                    )}
                </section>
                <section className="body">
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            {Array.from(Array(6)).map((_, index) => (
                            <Grid item xs={2} sm={4} md={4} key={index}>
                                <Item><p className="heading">Kinh nghiem</p><p>2-4 Nam</p></Item>
                            </Grid>
                            ))}
                        </Grid>
                    </Box>
                    <h2>MÔ TẢ CÔNG VIỆC</h2>
                    <CkeditorHtml data={post.description} />
                    <h2>JOB TAGS / SKILLS</h2>
                    <Tags/>
                    {applies?(
                        <section>
                            <h2>Danh sách ứng viên</h2>
                            <Box sx={{ flexGrow: 1 }}>
                                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                    {applies.map((item, index) => (
                                    <Grid item xs={2} sm={4} md={4} key={index}>
                                        <Item><p className="heading">{item.user}</p><p>{item.description}</p></Item>
                                    </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        </section>
                    ):(
                      <></>
                    )}
                    <CommentList/>
                </section>
            </main>
          <Footer/>
     
    </>
  );
}


