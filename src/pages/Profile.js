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

function Profile() {
  const [user, dispatch] = useContext(UserContext)
  const [openDialog, setOpenDialog] = useState(false);
  const { id } = useParams();
  const [profile, setProfile] = useState(null)
  const [rate, setRate] = useState(2)

  const handleOpen = () => setOpenDialog(true);
  const handleClose = () => setOpenDialog(false);


  const handleGetProfile = async () => {
    const res = await Api.get(endpoints['user-detail'](id))
        console.log(res.data)
        setProfile(res.data)
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
    <div className="dashboard-home">
      <Header/>
      <Box m={4}>
      <CenterDiv>
    {
      profile.avatar?(
        <Avatar alt="Remy Sharp" src={ profile.avatar} sx={{width: 170, height:170}} />

      ):(
        <Avatar alt="Remy Sharp" src={img} sx={{width: 170, height:170}} />

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
    <Rating value={rate} setRate={setRate}/> (AVG Rating: {profile.rateAvg})
    </Typography>
   
    {/* <Typography variant="h5" textAlign="center" gutterBottom component="div" className="name">
     ({profile.role})
    </Typography> */}
    <Typography variant="h5" textAlign="center" gutterBottom component="div" className="name">
     Email: {profile.email}
    </Typography>
    


 


      </Box>
  <Footer/>
</div>
  );
}

export default Profile;