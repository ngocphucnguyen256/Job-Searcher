import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Item from './Item'
import Typography from '@mui/material/Typography';

export default function Tags(props) {
    const  data  = props.data;
    console.log(data)



    if(data!=null && data.length>0){
        return (
            <div className="tags">

                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {data.map(item =>{
                            return (
                            <Grid item xs="auto">
                                <Item>
                                <Typography variant="body1" className="heading"
                                gutterBottom component="div">{item.name}</Typography></Item>
                            </Grid>
                            )
                        }) 
                        }
                    </Grid>
                </Box>
             </div>
        )
    }
    else{
        return(
            <div className="tags">
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {Array.from(Array(6)).map((_, index) => (
                        <Grid item xs={2} sm={2} md={2} key={index}>
                            <Item>
                            <Typography variant="body1" className="heading"
                             gutterBottom component="div">IT </Typography></Item>
                        </Grid>
                        ))}
                    </Grid>
                </Box>
            </div>
        )
    }





}


Tags.propTypes = {
    children: PropTypes.node,
  }
  
  Tags.defaultProps = {
    children: null,
  }