import { Fragment, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { IUser } from '../../interfaces';
import { logOut } from '../../requests';
import { AppBar } from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';


interface NavbarProps {
  currentUser: IUser|null;
  onLogOut: () => void;
}

export function Navbar(props: NavbarProps) {
  const history = useHistory();
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  // eslint-disable-next-line
  const handleChange = (event : any) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event : any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function logOutAndRedirect() {
    await logOut();
    props.onLogOut();
    history.push('/');
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            LDR Activity
        </Typography>
        {
        props.currentUser ?
          (
            <Fragment>
              <Link style={{ textDecoration: 'none' }} to="/progress"><MenuItem style={{ color: "white" }}> Progress </MenuItem></Link>
              <Link style={{ textDecoration: 'none' }} to="/update"><MenuItem style={{ color: "white" }}> Update </MenuItem></Link>

              {auth && (
                <div>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem ><Link style={{ color: 'black', textDecoration: 'none' }} to="/" >Homepage</Link></MenuItem>
                    <MenuItem onClick={logOutAndRedirect}>Logout</MenuItem>
                  </Menu>
                </div>
              )}
            </Fragment>
          ) : (
            <Fragment>
              <Link style={{ textDecoration: 'none' }} to="/login"><MenuItem style={{ color: "white" }}> Log in </MenuItem></Link>
              <Link style={{ textDecoration: 'none' }} to="/signup"><MenuItem style={{ color: "white" }}> Register </MenuItem></Link>
            </Fragment>
          )
        }
      </Toolbar>
    </AppBar>
  </Box>
  );
}