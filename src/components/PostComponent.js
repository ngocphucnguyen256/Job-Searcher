import CkeditorComponent from './CkeditorComponent'
import Button from '@mui/material/Button';
import SeclectGroup  from './SelectGroup';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import SelectComponent from './SelectComponent';
import {cities} from '../data/data'


const ariaLabel = { 'aria-label': 'description' };


const PostComponent = ()=>{
    return(
        <div className="post-component">
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                <Grid item xs={2} sm={4} md={4} >
                    <div>
                    <Typography variant="h6" gutterBottom component="div" className="name">
                        Vị trí cần tuyển
                    </Typography>
                    <Input defaultValue="" inputProps={ariaLabel} />

                    </div>
                </Grid>
                <Grid item xs={2} sm={4} md={4} >
                    <div>
                    <Typography variant="h6" gutterBottom component="div" className="name">
                        Chọn ngành nghề cần tuyển
                    </Typography>
                   <SeclectGroup/>

                    </div>
                </Grid>
                <Grid item xs={2} sm={4} md={4} >
                    <div>
                    <Typography variant="h6" gutterBottom component="div" className="name">
                        Chọn nơi làm việc
                    </Typography>
                   <SelectComponent data={cities}/>
                    </div>
                </Grid>
            </Grid>
        </Box>
     
        <Typography variant="h5" gutterBottom component="div" className="name">
            Mô tả chi tiết
            </Typography>
        
         <CkeditorComponent/>
         <Button className="post" variant="contained">Đăng ngay</Button>
        </div>
    )
}

export default PostComponent