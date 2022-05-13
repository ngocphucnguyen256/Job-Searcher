import Typography from '@mui/material/Typography';
import CenterDiv from '../components/CenterDiv'
import ModalComponent  from '../components/ModalComponent';
import Avatar from '@mui/material/Avatar';
import { UserContext } from '../App'
import  { useState, useContext } from 'react'
import img from '../images/404.jpg';
import Api, { endpoints } from '../config/Api';
import Button from '@mui/material/Button';





const DashboardHome = () => {
  const [user, dispatch] = useContext(UserContext)
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpen = () => setOpenDialog(true);
  const handleClose = () => setOpenDialog(false);

  const handleUpdateRole = async () => {
    let res = await Api.post(endpoints['waits'],
        {
        
        }
        ,{
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        
        })

        console.log(res.data)
        setOpenDialog(true)
    }



    return (
        <div className="dashboard-home">
            <CenterDiv>
            {
              user.avatar?(
                <Avatar alt="Remy Sharp" src={ user.avatar} sx={{width: 170, height:170}} />

              ):(
                <Avatar alt="Remy Sharp" src={img} sx={{width: 170, height:170}} />

              )
            }
          
            </CenterDiv>
            <Typography variant="h5" textAlign="center" gutterBottom component="div" className="name">
             User: {user.username}
            </Typography>
            <Typography variant="h5" textAlign="center" gutterBottom component="div" className="name">
             ({user.role})
            </Typography>
            <Typography variant="h5" textAlign="center" gutterBottom component="div" className="name">
             Email: {user.email}
            </Typography>
            
           {
             user.role==="User"?(
              <>
                          <CenterDiv>

               <Button variant="contained" color="primary" onClick={handleUpdateRole}>Nâng cấp tài khoản thành nhà tuyển dụng</Button>
 
              </CenterDiv>
              <Typography variant="h5" textAlign="center" gutterBottom component="div" className="name">
               để tìm kiếm ứng viên
              </Typography>
              </>
             ):(
              <>
             
              </>
             )
           }
       
         

            <ModalComponent handleOpen={handleOpen} open={openDialog} handleClose={handleClose}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
             Tài khoản của bạn đã đăng kí nâng cấp nhà tuyển dụng
            </Typography>
          </ModalComponent>
        </div>
    )
}


export default DashboardHome