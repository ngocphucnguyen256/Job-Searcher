import CkeditorComponent from './CkeditorComponent'
import Button from '@mui/material/Button';
import SeclectGroup  from './SelectGroup';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SelectComponent from './SelectComponent';
import Api, { endpoints } from '../config/Api';
import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { location, salary, level  } from '../data/data';



const PostComponent = ()=>{

    const [categories, setCategories] = useState([])

    useEffect(() => {
        let loadCategories = async () => {
            let res = await Api.get(endpoints['categories'])
            setCategories(res.data)
        }
        
        loadCategories()
    
    }, [])


    return(
        <div className="post-component">
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                <Grid item xs={2} sm={4} md={4} >
                    <div>
                    <Typography variant="h6" gutterBottom component="div" className="name">
                        Vị trí cần tuyển
                    </Typography>
                    <TextField className="search" fullWidth id="outlined-search" label="Chức danh" type="search" />

                    </div>
                </Grid>
                <Grid item xs={2} sm={4} md={4} >
                    <div>
                    <Typography variant="h6" gutterBottom component="div" className="name">
                        Chọn ngành nghề cần tuyển
                    </Typography>
                   <SeclectGroup data={categories}/>

                    </div>
                </Grid>
                <Grid item xs={2} sm={4} md={4} >
                    <div>
                    <Typography variant="h6" gutterBottom component="div" className="name">
                        Chọn nơi làm việc
                    </Typography>
                   <SelectComponent data={location}/>
                    </div>
                </Grid>
                <Grid item xs={2} sm={4} md={4} >
                    <div>
                    <Typography variant="h6" gutterBottom component="div" className="name">
                    Chọn mức lương
                    </Typography>
                    <SelectComponent name="Chọn mức lương" data={salary} fullWidth/>
                    </div>
                </Grid>
                <Grid item xs={2} sm={4} md={4} >
                    <div>
                    <Typography variant="h6" gutterBottom component="div" className="name">
                    Chọn cấp bậc
                    </Typography>
                    <SelectComponent name="Cấp bậc" data={level} fullWidth/>
                    </div>
                </Grid>
            </Grid>
        </Box>
     
        <Typography variant="h5" gutterBottom component="div" className="name">
            Mô tả chi tiết
            </Typography>
        
         <CkeditorComponent/>
         <div className='center-div'>
          <Button className="post" variant="contained">Đăng ngay</Button>
        </div>
        
        </div>
    )
}

export default PostComponent