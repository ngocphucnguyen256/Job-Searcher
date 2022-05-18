import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import Footer from '../partials/Footer';
import Typography from '@mui/material/Typography';
import CenterDiv from '../components/CenterDiv'
import ModalComponent  from '../components/ModalComponent';
import Avatar from '@mui/material/Avatar';
import { UserContext } from '../App'
import  { useState, useContext, useEffect } from 'react'
import img from '../images/404.jpg';
import Api, { endpoints } from '../config/Api';
import Button from '@mui/material/Button';
import Rating from '../components/Rating';
import CommentList from '../components/CommentList';
import Grid from '@mui/material/Grid';
import TabItem from '../components/TabItem';







function Profile() {
  const [user, dispatch] = useContext(UserContext)
  const [openDialog, setOpenDialog] = useState(false);
  const { id } = useParams();
  const [profile, setProfile] = useState(null)
  const [rate, setRate] = useState(null)
  const [comment, setComment] = useState('')
  const [commentData, setCommentData] = useState([])  
  const [posts, setPosts] = useState([])



  const handleOpen = () => setOpenDialog(true);
  const handleClose = () => setOpenDialog(false);




  const getComments = async () => {
    const res = await Api.get(endpoints['user-comments'](id))
        console.log(res.data)
        setCommentData(res.data)
    }


  const handlePostComment = async () => {
      const res = await Api.post(endpoints['comments'],{
        creator: user.id,
        hirer:profile.id,
        content:comment


      },  { headers:{
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }}
    )

    // setCommentData([...commentData, res.data])
    getComments()


  }

  

    const handleRating = async () => {
      const res = await Api.post(endpoints['user-rating'](id),{
        rate: rate
      },{
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
  
      })
  
      console.log(res.data)
      
      }
    
    const handleGetProfile = async () => {
      const res = await Api.get(endpoints['user-detail'](id))
        console.log(res.data)
        setProfile(res.data)
        // setRate(res.data.rateAvg)
      }



    const handleGetHirerPost = async () => {
      const res = await Api.get(endpoints['hirer-posts'](id))
        setPosts(res.data)
      
    }

        
  useEffect(() => {
      if(rate){
        handleRating().then(()=>{

          handleGetProfile()
        })

      }
      else{
        handleGetProfile()

      }
      
     
      getComments()
      handleGetHirerPost()
  },[rate])
  






  if(!profile){
    return (
      <div>
        <Header />
        <div>loading...</div>
        <Footer />
      </div>
    )
  }


  return (
    <div className="profile">
      <Header/>
      <Box m={4}>
      <CenterDiv>
    {
      profile.avatar_path?(
        <Avatar alt="Remy Sharp" src={ profile.avatar_path}
        style={{ height: '270px', width: '270px' }}
         />

      ):(
        <Avatar alt="alt" src={img}
        style={{ height: '270px', width: '270px' }}
         />
        

      )
    }
  
    </CenterDiv>
    <Typography variant="h5" textAlign="center" gutterBottom component="div" className="name">
     User: {profile.username}
    </Typography>
    <Typography variant="h6" textAlign="center" gutterBottom component="div" className="name">
     Your rate for this user
    </Typography>
    <Typography variant="h5" textAlign="center" gutterBottom component="div" className="name">
    <Rating value={rate} setRate={setRate}  /> (AVG Rating: {profile.rateAvg})
    </Typography>
   
    {/* <Typography variant="h5" textAlign="center" gutterBottom component="div" className="name">
     ({profile.role})
    </Typography> */}
    <Typography variant="h5" textAlign="center" gutterBottom component="div" className="name">
     Email: {profile.email}
    </Typography>

    <Typography variant="h2" textAlign="left" component="h2" >
    Các bài đăng của công ty
    </Typography>


    <Box sx={{ width:'100%' }}>
            <Grid container spacing={1} >
                  {posts.map((item, index) =>
                  <Grid item xs={4} key={index} >
                      <TabItem data={item}/>
                  </Grid>
              )}
            </Grid>
    </Box>
    <CommentList data={commentData} handlePostComment={handlePostComment}
     comment={comment} setComment={setComment} getComments={getComments}/>

      </Box>
  <Footer/>
</div>
  );
}

export default Profile;




