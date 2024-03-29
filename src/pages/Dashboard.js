import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { mainListItems, secondaryListItems } from "../partials/SideMenu";
import Avatar from "@mui/material/Avatar";
import img from "../images/404.jpg";
import CenterDiv from "../components/CenterDiv";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { useContext } from "react";
import SideMenuItem from "../components/SideMenuItem";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PropTypes from "prop-types";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

export default function Dashboard(props) {
  const children = props.children;
  const [open, setOpen] = React.useState(false);
  let navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [user, dispatch] = useContext(UserContext);

  const handleLogout = () => {
    dispatch({
      type: "logout",
      payload: {
        username: "",
      },
    });
    navigate("/");
  };

  React.useEffect(() => {
    navigate("/dashboard/home");
  }, []);

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }} className="dashboard">
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Link className="deco-none white" to={"/"}>
              Trang chủ
            </Link>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Bảng điều khiển
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav" className="nav">
            {!open ? (
              <></>
            ) : (
              <>
                <CenterDiv>
                  {user.avatar ? (
                    <Avatar
                      alt="Remy Sharp"
                      src={user.avatar}
                      sx={{ width: 170, height: 170 }}
                    />
                  ) : (
                    <Avatar
                      alt="Remy Sharp"
                      src={img}
                      sx={{ width: 170, height: 170 }}
                    />
                  )}
                </CenterDiv>
                <Typography
                  variant="h5"
                  textAlign="center"
                  gutterBottom
                  component="div"
                  className="name"
                >
                  {user.username}
                </Typography>
              </>
            )}

            {user.role === "User" ? (
              <>
                <SideMenuItem
                  name="Trang cá nhân"
                  icon={<DashboardIcon />}
                  link={`/profile/${user.id}`}
                />
                <SideMenuItem
                  name="Việc làm đã ứng tuyển"
                  icon={<DashboardIcon />}
                  link="/dashboard/applied"
                />
                <SideMenuItem
                  name="Các bài viết đã lưu"
                  icon={<DashboardIcon />}
                  link="/dashboard/saved-posted"
                />
              </>
            ) : (
              <>
                <SideMenuItem
                  name="Trang cá nhân"
                  icon={<DashboardIcon />}
                  link={`/profile-company/${user.id}`}
                />
                <SideMenuItem
                  name="Đăng bài tuyển dụng"
                  icon={<DashboardIcon />}
                  link="/dashboard/post"
                />
                <SideMenuItem
                  name="Các bài viết đã đăng"
                  icon={<DashboardIcon />}
                  link="/dashboard/all-posted"
                />
              </>
            )}
            {mainListItems}
            <SideMenuItem
              name="Đăng xuất"
              onClick={handleLogout}
              icon={<DashboardIcon />}
            />
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Box m={5}>
            {children}
            <Outlet />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

Dashboard.propTypes = {
  children: PropTypes.node,
};

Dashboard.defaultProps = {
  children: null,
};
