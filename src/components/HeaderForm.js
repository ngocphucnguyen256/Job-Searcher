import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import SelectComponent from './SelectComponent'
import Button from '@mui/material/Button';
import React, { useEffect, useState } from 'react';
import Api, { endpoints } from '../config/Api';
import { location, salary, level  } from '../data/data';




export default function HeaderForm() {

    const [name, email, subject] = useState('');
    const [currency, setCurrency] = useState('EUR');
    const [categories, setCategories] = useState([])

    useEffect(() => {
        let loadCategories = async () => {
            let res = await Api.get(endpoints['categories'])
            // let res = await fetch("/categories.json")
            // let data = await res.json()
            setCategories(res.data)
        }
        
        loadCategories()
    
    }, [])



    const handleChangeLocation = (event) => {
        setCurrency(event.target.value);
    };

    const handleSubmit =()=>{

    }

    return(
     <form className='react-form header-form' onSubmit={handleSubmit}>
      <h2>Đón lấy thành công với
            29,913 cơ hội nghề nghiệp</h2>
  
      <TextField className="search" fullWidth id="outlined-search" label="Chức danh, tên công ty" type="search" />
    
      <Box sx={{ width:'100%' }}>
      <Grid container spacing={1} >
        <Grid item xs={6}>
           <SelectComponent label="Địa điểm" data={location} fullWidth/>
        </Grid>
        <Grid item xs={6}>
         <SelectComponent label="Tất cả ngành nghề" data={categories} fullWidth/>
        </Grid>
        <Grid item xs={6}>
       <SelectComponent label="Chọn mức lương" data={salary} fullWidth/>
        </Grid>
        <Grid item xs={6}>   
            <SelectComponent label="Cấp bậc" data={level} fullWidth/>
        </Grid>
    </Grid>
        </Box>
      <div className='form-group'>
        <div className='center-div'>
          <Button variant="contained">Tìm việc ngay</Button>
        </div>
      </div>
     </form>
    )
   
}
  

const ReactFormLabel =(props) =>{
    return(
        <label htmlFor={props.htmlFor}>{props.title}</label>
        )

}