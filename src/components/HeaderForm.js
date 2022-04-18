import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import SelectComponent from './SelectComponent'
import Button from '@mui/material/Button';
import React, { useEffect, useState, useContext } from 'react';
import Api, { endpoints } from '../config/Api';

const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];


  const salary=[
    {
      "name": "Từ  3.000.000 đ",
  
    },
    {
      "name": "Từ  5.000.000 đ",
  
    },
    {
      "name": "Từ  7.000.000 đ",
  
    },
    {
      "name": "Từ  10.000.000 đ",
  
    },
    {
      "name": "Từ  15.000.000 đ",
  
    },
    {
      "name": "Từ  20.000.000 đ",
  
    },
  ]
  const location=[
    {
      "name": "Bắc Giang",
  
    },
    {
      "name": "Bắc Kạn",
  
    },
    {
      "name": "Cao Bằng",
  
    },
    {
      "name": "Hà Giang",
  
    },
  ]

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
  
      <TextField className="search" fullWidth id="outlined-search" label="Search field" type="search" />
    
      <Box sx={{ width:'100%' }}>
      <Grid container spacing={1} >
        <Grid item xs={6}>
            <SelectComponent fullWidth/>
        </Grid>
        <Grid item xs={6}>
         <SelectComponent data={categories} fullWidth/>
        </Grid>
        <Grid item xs={6}>
       <SelectComponent data={salary} fullWidth/>
        </Grid>
        <Grid item xs={6}> 
            <SelectComponent data={location} fullWidth/>
        </Grid>
    </Grid>
        </Box>
      <div className='form-group'>
       {/* <input id='formButton' className='btn' type='submit' placeholder='Tìm việc ngay' /> */}
       <Button variant="contained">Tìm việc ngay</Button>
 
       <Button variant="contained">Đăng ngay</Button>
      </div>
     </form>
    )
   
}
  

const ReactFormLabel =(props) =>{
    return(
        <label htmlFor={props.htmlFor}>{props.title}</label>
        )

}