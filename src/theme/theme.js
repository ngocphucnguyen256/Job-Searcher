import {createTheme}  from '@mui/material/styles';

const theme = createTheme({
    typography: {
        allVariants: {
            fontFamily:'"Poppins", sans-serif;',
            fontSize: 16,
        },
 
    },
    palette: {
        mode: 'dark',
        primary: {
          main: '#ffffff',
        },
      },
})

export default theme;