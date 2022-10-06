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
import Grid from '@mui/material/Grid';
import TabItem from '../components/TabItem';
import ProfileItemExperience from '../components/ProfileItemExperience';
import ProfileItem from '../components/ProfileItem';


function Profile() {
  const [user, dispatch] = useContext(UserContext)
  const [openDialog, setOpenDialog] = useState(false);
  const { id } = useParams();
  const [profile, setProfile] = useState(null)
  const [posts, setPosts] = useState([])
  const [profileDetail, setProfileDetail] = useState(null)


  const handleOpen = () => setOpenDialog(true);
  const handleClose = () => setOpenDialog(false);



  const handleDelete =()=>  {
    getProfileDetail();
  }


    const getProfileDetail= async () => {
      const res = await Api.get(endpoints['profile-detail'](3))
          console.log(res.data)
          setProfileDetail(res.data)
      }
  
    
    const handleGetProfile = async () => {
      const res = await Api.get(endpoints['user-detail'](id))
        console.log(res.data)
        setProfile(res.data)
        getProfileDetail()
      }


        
  useEffect(() => {
        handleGetProfile()
 
  },[])
  






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
        {/* <Typography variant="h5" textAlign="center" gutterBottom component="div" className="name">
        User: {profile.username}
        </Typography>

          {
          profile?.email?(
            <Typography variant="h5" textAlign="center" gutterBottom component="div" className="name">
            Email: {profile?.email}
          </Typography>
          ):(
            <></>
          )
        } */}

        {
          profileDetail && profileDetail.educations ?(
            <div>
              <ProfileItem data={profileDetail?.educations} handleDelete={handleDelete} authenticated/>
            </div>
          ):(
            <></>
          )
        }
        {
          profileDetail && profileDetail.experiences ?(
            <div>
              <ProfileItemExperience data={profileDetail?.experiences} handleDelete={handleDelete} authenticated/>
            </div>
          ):(
            <></>
          )
        }
      


        </Box>
        
      <Footer/>
    </div>
  );
}

export default Profile;




