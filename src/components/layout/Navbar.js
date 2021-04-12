import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appbar: {
    backgroundColor: 'white',
    color: 'rgba(0, 0, 0, 0.87)',
    borderBottom: '1px solid #e0e0e0'
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-around'
  }
}));

const Navbar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar} elevation={0}>
        <Toolbar className={classes.flex}>
          <div>
            <Typography variant="h4" component='h2' className={classes.title}>
              Diary
            </Typography>
          </div>
          <ul>
            <Link to='/'><Button>Home</Button></Link>
            <Link to='#'><Button>Features</Button></Link>
            <Link to='#'><Button>Sign Up</Button></Link>
            <Link to='#'><Button>Login</Button></Link>
          </ul>
        </Toolbar>

      </AppBar>
    </div >
  );
}
export default Navbar
