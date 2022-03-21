import {useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import SelectComponent from './SelectComponent'
import Button from '@mui/material/Button';

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

export default function HeaderForm() {

    const [name, email, subject] = useState('');
    const [currency, setCurrency] = useState('EUR');

    const handleChangeLocation = (event) => {
        setCurrency(event.target.value);
    };

    const handleSubmit =()=>{

    }

    return(
     <form className='react-form header-form' onSubmit={handleSubmit}>
      <h2>Đón lấy thành công với
            29,913 cơ hội nghề nghiệp</h2>
  
      <TextField fullWidth id="outlined-search" label="Search field" type="search" />
    
      <Box sx={{ width:'100%' }}>
      <Grid container spacing={1} >
        <Grid item xs={6}>
        {/* <TextField
            id="outlined-select-currency"
            select
            label="Select"
            value={currency}
            onChange={handleChangeLocation}
       
         >
            {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
                {option.label}
            </MenuItem>
            ))}
        </TextField> */}
            <SelectComponent fullWidth/>
        </Grid>
        <Grid item xs={6}>
       <SelectComponent/>
        </Grid>
        <Grid item xs={6}>
       <SelectComponent/>
        </Grid>
        <Grid item xs={6}>
            <SelectComponent/>
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