import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import {Link} from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import {logout} from '../../API/Auth'
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
          logout()
          handleMenuClose()
        }}>
          Logout
        </Link>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ m: -1 }}>
      <AppBar position="static" style={{background: '#07a0d1'}}>
        <Toolbar>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <strong>Suneb</strong>
          </Typography>
          <Search style={{marginLeft: '8%', width: '500px'}}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              //onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Link to={`/`} style={{color: 'white'}}>
                  <HomeIcon fontSize='large'/>
              </Link>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              //onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <InfoIcon fontSize='large'/>
            </IconButton>
          </Box>
          
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle fontSize='large'/>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}
