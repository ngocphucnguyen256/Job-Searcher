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
import {Link} from 'react-router-dom'
import Typography from '@mui/material/Typography';



export default function JobDetails(props) {

    const { id } = useParams();

    const [post, setPost] = useState(null)
    const [applies, setApplies] = useState(null)

    const loadPostAppliessById = async () => {
        const res = await Api.get(endpoints['post-detail-applies'](id))
        console.log("applies", res.data)
        setApplies(res.data)

    }


    useEffect(() => {

        const loadPostDetailsById = async () => {
            const res = await Api.get(endpoints['post-detail'](id))
            setPost(res.data)
            if(props.authenticated){
                loadPostAppliessById()
            
           }
    
    
        }
        
       
        loadPostDetailsById()
  

    }, [])


    console.log(post)


    if(!post) {
        return <div>Loading...</div>
    }


    let url=`/job-list`

  return (
    <>
        <Header/>
  
            <main className="job-detail">
            {
                props.authenticated?(
                        <section>
                            <Typography variant="h2"  gutterBottom component="h2">Danh sách ứng viên</Typography>
                            <Box sx={{ flexGrow: 1 }}>
                                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                                    {applies!=null && applies.length > 0?(
                                        applies.map((item, index) => (
                                        <Grid item xs={2} sm={4} md={4} key={index}>
                                            
                                                <Item>
                                                    <p className="heading">{item.user}</p>
                                                    <p>{item.description}</p>
                                                </Item>
                                            {
                                                item.CV?(
                                                    <Link to={item.CV} download className="link">
                                                        <h3>CV: {item.CV}</h3>
                                                    </Link>
                                                ):(
                                                <></>
                                                )
                                            }
                                        </Grid>
                                        ))
                                    ):(
                                    <Typography variant="h3"  gutterBottom component="h3">Chưa có ứng viên nào apply</Typography>

 
                                    )}
                                </Grid>
                            </Box>
                        </section>
              
                ):(
                    <></>
                )
            }
                <section className="header">
                    <h1>{post.title}</h1>
                    <Link to={url} className="link">
                    <h2>Công ty: {post.company}</h2>
                    </Link>

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
                    <CommentList/>
                </section>
            </main>
          <Footer/>
     
    </>
  );
}


