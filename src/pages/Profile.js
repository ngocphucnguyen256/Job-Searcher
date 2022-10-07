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
  const [profileDetailId, setProfileDetailId] = useState('');
  const [profile, setProfile] = useState(null)
  const [posts, setPosts] = useState([])
  const [profileDetail, setProfileDetail] = useState(null)

  const handleOpen = () => setOpenDialog(true);
  const handleClose = () => setOpenDialog(false);

  const authenticated = user.id ==id ? true : false

  const handleDelete =()=>  {
    getProfileDetail(profileDetailId);
  }



    
    const handleGetProfile = async () => {
      const res = await Api.get(endpoints['user-detail'](id))
        console.log(res.data)
        setProfile(res.data)
        return res.data.profile.id
      }

    const getProfileDetail= async (profileid) => {
      const res = await Api.get(endpoints['profile-detail'](profileid))
          console.log(res.data)
          setProfileDetail(res.data)
          setProfileDetailId(profileid)
    }
  

        
  useEffect(() => {
        handleGetProfile().then((profileid) => {
          getProfileDetail(profileid)
        })
        
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

        <Typography variant="h5" textAlign="center" gutterBottom component="div" className="name">
        Tên đăng nhập: {profile.username}
        </Typography>
       <Typography variant="h5" textAlign="center" gutterBottom component="div" className="name">
        Tên: {profile.first_name} {profile.last_name}
        </Typography>
          {
          profile?.email?(
            <Typography variant="h5" textAlign="center" gutterBottom component="div" className="name">
            Email: {profile?.email}
          </Typography>
          ):(
            <></>
          )
        }
        {
          profile?.profile.nick_name?(
            <Typography variant="h5" textAlign="center" gutterBottom component="div" className="name">
            Biệt danh: {profile?.profile.nick_name}
          </Typography>
          ):(
            <></>
          )
        }
        {
          profile?.profile.description?(
            <Typography variant="h5" textAlign="center" gutterBottom component="div" className="name">
            Mô tả: {profile?.profile.description}
          </Typography>
          ):(
            <></>
          )
        }
        {
          profileDetail && profileDetail.educations ?(
            <div>
              <ProfileItem data={profileDetail?.educations} handleDelete={handleDelete} authenticated={authenticated}/>
            </div>
          ):(
            <></>
          )
        }
        {
          profileDetail && profileDetail.experiences ?(
            <div>
              <ProfileItemExperience data={profileDetail?.experiences} handleDelete={handleDelete} authenticated={authenticated}/>
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




