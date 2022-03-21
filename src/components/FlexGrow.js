import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

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

export default function FlexGrow() {
  return (
    <div style={{ width: '100%' }}>
      <Box
        sx={{ display: 'flex', p: 1, bgcolor: 'background.paper', borderRadius: 1 }}
      >
        <Item>
            <img src="https://www.gstatic.com/webp/gallery/1.sm.jpg" alt="1" />
        </Item>
        <Item sx={{ flexGrow: 1 }}>Item 1</Item>
       
      </Box>
    </div>
  );
}
