import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';


export default function CustomizedRating({rate,setRate}) {
  return (
    <Box
      sx={{
        '& > legend': { mt: 2 },
      }}
    >
      <Rating name="customized-10" value={rate} max={10} 
      onChange={(event, newValue) => {
        setRate(newValue);
      }}
      />
    </Box>
  );
}
