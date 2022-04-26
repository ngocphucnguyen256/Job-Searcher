import CkeditorComponent from './CkeditorComponent'
import Button from '@mui/material/Button';
import SeclectGroup  from './SelectGroup';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SelectComponent from './SelectComponent';
import Api, { endpoints } from '../config/Api';
import React, { useEffect, useState ,useContext} from 'react';
import TextField from '@mui/material/TextField';
import { location, salary, level  } from '../data/data';
import { UserContext } from '../App'



const PostComponent = ()=>{

    const [categories, setCategories] = useState([])
    const [posts, setPosts] = useState(null)
    const [dataCkeditor, setDataCkeditor] = useState('')
    const [dataMajorId, setDataMajorId] = useState(null)
    const [user, dispatch] = useContext(UserContext)

    useEffect(() => {
        let loadCategories = async () => {
            let res = await Api.get(endpoints['categories'])
            setCategories(res.data)
        }
        
        loadCategories()
        
    }, [])


    const convertSalary =(string) => {
        let salaryIndex= salary.findIndex(item => item.name === string)
        return salary[salaryIndex].data
        
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(            {
            title: data.get('title'),
            major: dataMajorId,
            location : data.get('location'),
            to_salary: convertSalary(data.get('salary')),
            type: data.get('level'),
            time_work:data.get('level'),
            description: dataCkeditor,
            company: user.username
    })
        
        const postPost = async () => {
            let res = await Api.post(endpoints['posts'],
                {
                    title: data.get('title'),
                    major: dataMajorId,
                    location : data.get('location'),
                    to_salary: convertSalary(data.get('salary')),
                    type: data.get('level'),
                    time_work:data.get('level'),
                    description: dataCkeditor,
                    company: user.username
            }
            ,{
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            
            })
    
            console.log(res.data)
        }

        postPost()

    };
    


    return(
        <div className="post-component">
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
             <Box sx={{ flexGrow: 1 }}>
               <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                <Grid item xs={2} sm={4} md={4} >
                    <div>
                    <Typography variant="h6" gutterBottom component="div" className="name">
                        Vị trí cần tuyển
                    </Typography>
                    <TextField name="title" className="search" fullWidth id="outlined-search" label="Chức danh" type="search" />

                    </div>
                </Grid>
                <Grid item xs={2} sm={4} md={4} >
                    <div>
                    <Typography variant="h6" gutterBottom component="div" className="name">
                        Chọn ngành nghề cần tuyển
                    </Typography>
                   <SeclectGroup name="major" data={categories} setDataMajorId={setDataMajorId} />

                    </div>
                </Grid>
                <Grid item xs={2} sm={4} md={4} >
                    <div>
                    <Typography variant="h6" gutterBottom component="div" className="name">
                        Chọn nơi làm việc
                    </Typography>
                   <SelectComponent name="location" data={location}/>
                    </div>
                </Grid>
                <Grid item xs={2} sm={4} md={4} >
                    <div>
                    <Typography variant="h6" gutterBottom component="div" className="name">
                    Chọn mức lương
                    </Typography>
                    <SelectComponent label="Chọn mức lương" name="salary" data={salary} fullWidth/>
                    </div>
                </Grid>
                <Grid item xs={2} sm={4} md={4} >
                    <div>
                    <Typography variant="h6" gutterBottom component="div" className="name">
                    Chọn cấp bậc
                    </Typography>
                    <SelectComponent label="Cấp bậc" name="level" data={level} fullWidth/>
                    </div>
                </Grid>
            </Grid>
        </Box>
     
        <Typography variant="h5" gutterBottom component="div" className="name">
            Mô tả chi tiết
        </Typography>
        
         <CkeditorComponent name="detail" setDataCkeditor={setDataCkeditor}/>
         <div className='center-div'>
          <Button className="post" variant="contained"   type="submit" >Đăng ngay</Button>
        </div>
        </Box>
        </div>
    )
}

export default PostComponent