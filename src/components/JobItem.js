import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EditLocationIcon from '@mui/icons-material/EditLocation';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom'

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : 'grey.100'),
        color: (theme) => (theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800'),
        border: '1px solid',
        borderColor: (theme) =>
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
        borderRadius: 2,
        fontSize: '0.875rem',
        fontWeight: '700',
        textDecoration: 'none !important',
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool]),
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
};

export default function JobItem(props) {
  const data = props.data
  console.log(data)
  const slug = "viec lam it"
  const id = "12342342342"

  return (
    <div className="flex-grow" style={{ width: '100%' }}>
      <Link to={`/job-detail/${slug}/${id}`} className="link">
        <Box
          sx={{ display: 'flex', p: 1, bgcolor: 'background.paper', borderRadius: 1 }}
        >
          <Item>
              <img src="https://www.gstatic.com/webp/gallery/1.sm.jpg" alt="1" />
          </Item>
          <Item sx={{ flexGrow: 1 }}>
          <Typography variant="h5" className="title" gutterBottom component="div">
          {data?.title}
          </Typography>
          <Typography variant="body1" className="company" gutterBottom component="div">
          {data?.company}
          </Typography>
          <div className="flex">
            <AttachMoneyIcon/> 
            <Typography variant="body1" className="price" gutterBottom component="div">
            Lương: {data?.from_salary} - {data?.to_salary}
            </Typography>
          </div>
          <div className="flex"> 
          <EditLocationIcon/>
          <Typography variant="body1" className="location" gutterBottom component="div">
          {data?.location}
          </Typography>
          </div>
          </Item>
        
        </Box>
      </Link>
    </div>
  );
}
