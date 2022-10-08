import React from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import Typography from '@mui/material/Typography';
import CenterDiv from '../components/CenterDiv'
import Avatar from '@mui/material/Avatar';
import { UserContext } from '../App'
import  { useState, useContext, useEffect } from 'react'
import img from '../images/404.jpg';
import Api, { endpoints } from '../config/Api';
import Rating from '../components/Rating';
import CommentList from '../components/CommentList';
import Grid from '@mui/material/Grid';
import TabItem from '../components/TabItem';

function ProfileCompany() {
  const [user, dispatch] = useContext(UserContext)
  const [openDialog, setOpenDialog] = useState(false);
  const { id } = useParams();
  const [profile, setProfile] = useState(null)
  const [profileDetail, setProfileDetail] = useState(null)
  const [rate, setRate] = useState(null)
  const [comment, setComment] = useState('')
  const [commentData, setCommentData] = useState([])  
  const [posts, setPosts] = useState([])
  const [profileDetailId, setProfileDetailId] = useState(null)

  const handleOpen = () => setOpenDialog(true);
  const handleClose = () => setOpenDialog(false);


  const handleGetCompanyProfile = async () => {
    const res = await Api.get(endpoints['getCompanyProfile'](id))
      console.log(res.data)
      setProfile(res.data)
      return res.data.id

    }

  
  const handleGetProfileDetails = async (profileid) => {
    const res = await Api.get(endpoints['company-detail'](profileid))
      console.log(res.data)
      setProfileDetail(res.data)
      setProfileDetailId(profileid)
      setRate(res.data.rating)
      
    }

  const getComments = async (profileid) => {
    const res = await Api.get(endpoints['companyCommentsById'](profileid))
        console.log(res.data)
        setCommentData(res.data)
    }


  const handlePostComment = async () => {
    if (comment.length>0){
      const res = await Api.post(endpoints['companyCommentsById'](profileDetailId),{
        content:comment
      },  { headers:{
      "Authorization": `Bearer ${localStorage.getItem("token")}`
      }}
      ).then((res) => {
        getComments(profileDetailId)
      }).catch(err => {
        alert(err.message)
      })
      }
    else{
      alert('Bình luận không thể trống')
    }


  }




  const handleRating = async () => {
    const res = await Api.post(endpoints['user-rating'](profileDetailId),{
      rate: rate
    },{
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    },

    })

    console.log(res.data)
    
    }







  const handleGetCompanyPost = async (companyId) => {
    const res = await Api.get(endpoints['companyPosts'](companyId))
      setPosts(res.data)
      console.log(res.data)
    
  }

        
useEffect(() => {

  console.log(rate);
  
    if(rate){
      handleRating().then(()=>{

        handleGetCompanyProfile().then((profileid) => {
          handleGetProfileDetails(profileid)
        })
      
      })

    }
    else{
      handleGetCompanyProfile().then((profileid) => {
        handleGetProfileDetails(profileid)
      })
    }
    
   if(profileDetailId){
     handleGetCompanyPost(profileDetailId)
     getComments(profileDetailId)
   }

},[rate,profileDetailId])







  if(!profile || !profileDetail) {
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
      profileDetail?.avatar_path?(
        <Avatar alt="Remy Sharp" src={ profileDetail.avatar_path}
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
     Công ty: {profileDetail?.company_name}
    </Typography>
    {
      profileDetail?.web_url?(
        <Typography variant="h5" textAlign="center" gutterBottom component="div" className="name">
        Website: {profileDetail?.web_url}
       </Typography>
      ):(
        <></>
      )
    }
    {
      profileDetail?.description?(
        <Typography variant="h5" textAlign="center" gutterBottom component="div" className="name">
        Mô tả: {profileDetail?.description}
       </Typography>
      ):(
        <></>
      )
    }
    {
      user.user_role =="User"?(
        <>
          <Typography variant="h6" textAlign="center" gutterBottom component="div" className="name">
          Your rate {rate} for this user
          </Typography>
          <Typography variant="h5" textAlign="center" gutterBottom component="div" className="name">
          <Rating value={rate} setRate={setRate}  /> (AVG Rating: {profileDetail.rateAvg})
          </Typography>
        </>
      ):(
        <Typography variant="h5" textAlign="center" gutterBottom component="div" className="name">
         (AVG Rating: {profileDetail.rateAvg})
        </Typography>
      )
    }
    {
      profileDetail?.email?(
        <Typography variant="h5" textAlign="center" gutterBottom component="div" className="name">
        Email: {profileDetail?.email}
       </Typography>
      ):(
        <></>
      )
    }

            <Typography variant="h2" textAlign="left" component="h2" >
            Một số bài đăng của công ty
            </Typography>


            <Box sx={{ width:'100%' }}>
                    <Grid container spacing={1} >
                          {posts.slice(0,6).map((item, index) =>
                          <Grid item xs={6} key={index} >
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

export default ProfileCompany;




