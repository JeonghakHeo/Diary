import { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { login, logout } from '../../actions/auth';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import CancelIcon from '@material-ui/icons/Cancel';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';


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
  label: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: 3
  },
  appbar: {
    backgroundColor: 'white',
    color: 'rgba(0, 0, 0, 0.87)',
    borderBottom: '1px solid #e0e0e0'
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Quicksand',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: 'none',
    boxShadow: theme.shadows[5],
    textAlign: 'center',
    width: '900px',
    position: 'absolute',
    top: '10%',
    outline: 'none',
    borderRadius: 8,
    height: '500px'
  },
  close: {
    marginLeft: '100%',
    marginBottom: '5%'
  },
  margin: {
    margin: theme.spacing(1)
  },
  gridLeft: {
    padding: '0 20px'
  },
  gridRight: {
    backgroundColor: '#606fc7',
    color: 'white',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 20px',
    borderRadius: '0 6px 6px 0'
  },
  form: {
    marginBottom: 20,
  },
  container: {
    alignItems: 'center',
    alignContent: 'center',
    direction: 'row',
    height: 'inherit'
  },
  error: {
    marginLeft: '3px',
    fontSize: '13px'
  },
  errorCancelIcon: {
    marginTop: '3px',
  },
  errorHelperText: {
    marginLeft: '3px',
    fontSize: '13px'
  }
}));

const Navbar = ({ login, logout, isAuthenticated, loading, errors }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [values, setValues] = useState({
    email: '',
    password: '',
    showpassword: false
  });

  const { email, password, showpassword } = values;

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickShowpassword = () => {
    setValues({ ...values, showpassword: !showpassword });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (email == '') {
      setEmailError(true)

      setTimeout(() => {
        setEmailError(false)
      }, 3000)
    }

    if (password == '') {
      setPasswordError(true)

      setTimeout(() => {
        setPasswordError(false)
      }, 3000)
    }
    if (email && password) {
      login({ email, password })
    }
  }

  if (isAuthenticated) {
    // setOpen(false)
    // console.log(isAuthenticated)
    setTimeout(() => {
      return <Redirect to='/notes' />
    }, 1000)
    // return <Redirect to='/notes' />
  }



  const handleLogout = () => {
    logout();
    handleClose();
  }


  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar} elevation={0}>
        <Toolbar className={classes.flex}>
          <div>
            <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
              <Typography variant='h4' component='h2' className={classes.title}>
                Diary
            </Typography>
            </Link>
          </div>
          <ul>
            {!loading && (<>{!isAuthenticated ? (
              <>
                <Link to='/'><Button>Home</Button></Link>
                <Link to='#'><Button>Features</Button></Link>
                <Link to='/signup'><Button>Signup</Button></Link>
                <Button onClick={handleOpen}>Login</Button>


                <Modal
                  className={classes.modal}
                  open={open}
                  onClose={handleClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={open}>
                    <div className={classes.paper}>
                      <Grid container className={classes.container}>
                        <Grid item xs={6} className={classes.gridLeft}>
                          <form noValidate autoComplete='off' onSubmit={e => onSubmit(e)}>
                            <Typography variant='h4' component='h2' gutterBottom>Login</Typography>
                            <FormControl className={classes.form} variant='outlined' fullWidth>
                              <InputLabel className={classes.label} required><PersonIcon className={classes.icon} fontSize='small' />Email</InputLabel>
                              <OutlinedInput
                                value={email}
                                error={emailError}
                                onChange={handleChange('email')}
                                labelWidth={75}
                              />
                              {emailError ?
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  <CancelIcon color='secondary' fontSize='small' className={classes.errorCancelIcon} />
                                  <FormHelperText className={classes.errorHelperText}><Typography color='secondary' style={{ fontSize: '13px' }}>Email is required</Typography></FormHelperText>
                                </div> :
                                null}
                            </FormControl>

                            <FormControl className={classes.form} variant='outlined' fullWidth>
                              <InputLabel className={classes.label} required><EmailIcon className={classes.icon} fontSize='small' />Password</InputLabel>
                              <OutlinedInput
                                type={showpassword ? 'text' : 'password'}
                                value={password}
                                error={passwordError}
                                onChange={handleChange('password')}
                                labelWidth={105}
                                endAdornment={
                                  <InputAdornment position='end'>
                                    <IconButton
                                      onClick={handleClickShowpassword}
                                      onMouseDown={handleMouseDownPassword}
                                      edge='end'
                                    >
                                      {showpassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                  </InputAdornment>
                                }
                              />
                              {passwordError ?
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                  <CancelIcon color='secondary' fontSize='small' className={classes.errorCancelIcon} />
                                  <FormHelperText className={classes.errorHelperText}><Typography color='secondary' style={{ fontSize: '13px' }}>Password is required</Typography></FormHelperText>
                                </div>
                                : null}
                            </FormControl>
                            {
                              errors.map(error => (
                                <div key={error.id} style={{ display: 'flex', alignItems: 'center', marginTop: '-15px', marginBottom: '15px' }}>
                                  <CancelIcon color='secondary' fontSize='small' />
                                  <Typography color='secondary' className={classes.error}>{error.msg}</Typography>
                                </div>
                              ))
                            }
                            <Link to='#'><Typography>Forgot password?</Typography></Link>
                            <Typography gutterBottom>Don't have an account? <Link to='/signup'>Sign up</Link></Typography>
                            <Button className={classes.margin} variant='contained' color='primary' onClick={onSubmit}>Login</Button>
                          </form>
                        </Grid>

                        <Grid item xs={6} className={classes.gridRight}>
                          <div>
                            <Typography component='h2' variant='h3' gutterBottom>Welcome back!</Typography>
                            <Typography component='h3' variant='h6'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum quis dolore ratione modi odio pariatur, dolorum eligendi? Provident quae, ea facilis magni odit, odio laudantium veritatis amet quaerat neque dignissimos!</Typography>
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  </Fade>
                </Modal>
              </>) : (
              <>
                <Link to='/'><Button>Home</Button></Link>
                <Link to='#'><Button>Features</Button></Link>
                <Link to='/notes'><Button>Notes</Button></Link>
                <Button onClick={handleLogout}>Logout</Button>
              </>
            )}</>)}

          </ul>
        </Toolbar>
      </AppBar>
    </div >
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  errors: state.error
})

export default connect(mapStateToProps, { login, logout })(Navbar)
