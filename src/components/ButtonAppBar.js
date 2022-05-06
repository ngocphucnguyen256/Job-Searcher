import * as React from 'react';
import  { useState, useContext } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {Link} from 'react-router-dom'
import img from '../images/404.jpg';
import { UserContext } from '../App'


const pages = [
  {
    'name': 'Tìm việc làm',
    'url': '/job-list'
  
  }
];
const settings = [
{
  'name': 'Dashboard',
  'url': '/dashboard'

}

];




const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [user, dispatch] = useContext(UserContext)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    dispatch({
      "type": "logout",
      "payload": {
          "username": ""
      }
  })
  }

  

  return (
        <AppBar position="static" color="primary" enableColorOnDark>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
            <Link to='/' className="deco-none ">
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
              >
                JOB SEARCHER
              </Typography>
             </Link>
              

              <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                  }}
                >
                  {pages.map((page,index) => (
                     
                    <MenuItem key={index} onClick={handleCloseNavMenu}>
                      <Link to={page.url} className="deco-none black">
                        <Typography textAlign="center">{page.name}</Typography>
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
              >
                LOGO
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page,index) => (
                  <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Link to={page.url} className="deco-none black">
                    <Typography textAlign="center">{page.name}</Typography>
                  </Link>
                </MenuItem>
                ))}
              </Box>


              {
                user?(
                  <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      {
                        user.avatar?(
                          <Avatar src={ user.avatar} />

                        ):(
                          <Avatar  src={img} />

                        )
                      }
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    
                    <Typography textAlign="center">{user.username}</Typography>
                    {settings.map((setting, key) => (
               
                      <MenuItem key={key} onClick={handleCloseUserMenu}>
                      <Link to={setting.url} className="deco-none black">
                        <Typography textAlign="center">{setting.name}</Typography>
                      </Link>
                    </MenuItem>
                    ))}
                        <MenuItem  onClick={handleLogout}>
                        <Link to='/sign-in' className="deco-none black">
                          <Typography textAlign="center">Sign out</Typography>
                        </Link>
                      </MenuItem>
                  </Menu>
                </Box>
                ) :(<>
                     <MenuItem  onClick={handleCloseNavMenu}>
                      <Link to='/sign-in' className="deco-none black">
                          <Typography textAlign="center">Login</Typography>
                        </Link>
                    </MenuItem>
                </>)
              }
             
            </Toolbar>
          </Container>
        </AppBar>

  );
};
export default ResponsiveAppBar;
