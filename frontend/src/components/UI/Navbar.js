import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import {logout} from '../../API/authSlice'
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
// import {useHistory} from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';
import HomeIcon from '@mui/icons-material/Home';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: theme.spacing(5),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();

  const isMenuOpen = Boolean(anchorEl);
  // const router = useHistory();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>
        <Link to={`users`} onClick={handleMenuClose}>Profile</Link>
      </MenuItem>
      <MenuItem>
        <Link to={`/`} onClick={handleMenuClose}>Dashboard</Link>
      </MenuItem>
      <MenuItem>
        <Link to={`/login`} onClick={() => {
          dispatch(logout())
          handleMenuClose()
        }}>
          Logout
        </Link>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ m: -1 }}>
      <AppBar position="static" style={{background: 'rgba(255,255,255,0)'}}>
        <Toolbar style={{display:"flex", justifyContent:"space-between"}}>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <strong>Suneb</strong>
          </Typography>
          {/* <Box sx={{ flexGrow: 1 }} /> */}
          <Box style={{gap:'20px'}} sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              //onClick={handleProfileMenuOpen}
              color="inherit" 
            >
              <Link to={`/`} style={{color: 'white',display:"flex", alignItems:"center",textDecoration:"none",gap:"5px"}}>
                  <span style={{textDecoration:"none"}}>Главная</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 16 16" fill="none">
                    <path d="M13.3333 11.3334V7.63476V7.63426C13.3333 7.27837 13.3333 7.10032 13.29 6.93464C13.2516 6.78774 13.1884 6.64844 13.1031 6.52282C13.0069 6.38107 12.873 6.26381 12.6049 6.02924L9.40491 3.22924C8.90717 2.79371 8.6583 2.57598 8.37821 2.49315C8.13142 2.42017 7.8685 2.42017 7.6217 2.49315C7.34177 2.57594 7.09315 2.79348 6.59596 3.22853L6.59514 3.22924L3.39514 6.02924L3.3945 6.0298C3.12684 6.264 2.99292 6.38118 2.89677 6.52282C2.8115 6.64844 2.74832 6.78774 2.70994 6.93464C2.66663 7.1004 2.66663 7.27853 2.66663 7.63476V11.3334C2.66663 11.9546 2.66663 12.2652 2.76812 12.5102C2.90345 12.8369 3.16316 13.0965 3.48987 13.2318C3.7349 13.3333 4.04552 13.3333 4.66678 13.3333C5.28803 13.3333 5.59851 13.3333 5.84354 13.2318C6.17024 13.0965 6.42974 12.8369 6.56506 12.5102C6.66656 12.2652 6.66663 11.9546 6.66663 11.3333V10.6667C6.66663 9.93028 7.26358 9.33332 7.99996 9.33332C8.73634 9.33332 9.33329 9.93028 9.33329 10.6667V11.3333C9.33329 11.9546 9.33329 12.2652 9.43479 12.5102C9.57011 12.8369 9.82983 13.0965 10.1565 13.2318C10.4016 13.3333 10.7122 13.3333 11.3334 13.3333C11.9547 13.3333 12.2652 13.3333 12.5102 13.2318C12.8369 13.0965 13.0964 12.8369 13.2317 12.5102C13.3332 12.2652 13.3333 11.9546 13.3333 11.3334Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
              </Link>
            </IconButton>
            <IconButton
              //onClick={handleProfileMenuOpen}
              color="inherit" 
            >
              <Link to={`/`} style={{color: 'white',display:"flex", alignItems:"center",textDecoration:"none",gap:"5px"}}>
                  <span style={{}}>Доска</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 16 16" fill="none">
                    <g clip-path="url(#clip0_8_49)">
                    <path d="M6.00004 11.3333L2.66671 14.6667M10 11.3333L13.3334 14.6667M8.00004 1.33334V2.66668M8.00004 14.6667V11.3333M3.46671 11.3333H12.5334C13.2801 11.3333 13.6535 11.3333 13.9387 11.188C14.1896 11.0602 14.3936 10.8562 14.5214 10.6053C14.6667 10.3201 14.6667 9.94675 14.6667 9.20001V4.80001C14.6667 4.05327 14.6667 3.67991 14.5214 3.39469C14.3936 3.14381 14.1896 2.93983 13.9387 2.812C13.6535 2.66668 13.2801 2.66668 12.5334 2.66668H3.46671C2.71997 2.66668 2.3466 2.66668 2.06139 2.812C1.8105 2.93983 1.60653 3.14381 1.4787 3.39469C1.33337 3.67991 1.33337 4.05327 1.33337 4.80001V9.20001C1.33337 9.94675 1.33337 10.3201 1.4787 10.6053C1.60653 10.8562 1.8105 11.0602 2.06139 11.188C2.3466 11.3333 2.71997 11.3333 3.46671 11.3333Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_8_49">
                    <rect width="16" height="16" fill="white"/>
                    </clipPath>
                    </defs>
                  </svg>
              </Link>
            </IconButton>
            <IconButton
              //onClick={handleProfileMenuOpen}
              color="inherit" 
            >
              <Link to={`users`} style={{color: 'white',display:"flex", alignItems:"center",textDecoration:"none",gap:"5px"}}>
                  <span style={{textDecoration:"none"}}>Профиль</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 16 16" fill="none">
                    <g clip-path="url(#clip0_8_40)">
                    <path d="M3.54424 12.9589C3.94979 12.0035 4.89666 11.3333 6.00004 11.3333H10C11.1034 11.3333 12.0503 12.0035 12.4558 12.9589M10.6667 6.33334C10.6667 7.8061 9.4728 9.00001 8.00004 9.00001C6.52728 9.00001 5.33337 7.8061 5.33337 6.33334C5.33337 4.86058 6.52728 3.66668 8.00004 3.66668C9.4728 3.66668 10.6667 4.86058 10.6667 6.33334ZM14.6667 8.00001C14.6667 11.6819 11.6819 14.6667 8.00004 14.6667C4.31814 14.6667 1.33337 11.6819 1.33337 8.00001C1.33337 4.31811 4.31814 1.33334 8.00004 1.33334C11.6819 1.33334 14.6667 4.31811 14.6667 8.00001Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_8_40">
                    <rect width="30" height="30" fill="white"/>
                    </clipPath>
                    </defs>
                  </svg>
              </Link>
            </IconButton>
          </Box>
          
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <IconButton
              //onClick={handleProfileMenuOpen}
              color="inherit" 
            >
              <Link to={`/login`} onClick={() => {dispatch(logout())}} 
              style={{color: 'white',display:"flex", alignItems:"center",textDecoration:"none",gap:"5px"}}>
                  <span style={{textDecoration:"none"}}>Выйти</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 16 16" fill="none">
                    <path d="M12 5.33333L14.6666 8M14.6666 8L12 10.6667M14.6666 8H5.99998M9.99998 2.80269C9.15015 2.29218 8.16348 2 7.11109 2C3.92011 2 1.33331 4.68629 1.33331 8C1.33331 11.3137 3.92011 14 7.11109 14C8.16348 14 9.15015 13.7078 9.99998 13.1973" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
              </Link>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
