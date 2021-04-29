import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Typography, Button, Container, FormControl } from '@material-ui/core';
import { KeyboardArrowRight } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import { register } from '../actions/auth';

const useStyles = makeStyles({
  container: {
    textAlign: 'center',
    width: 700,
    marginTop: 30
  },
  title: {
    // margin: '20px 0'
  },
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  },
  form: {
    marginTop: 20,
    marginBottom: 20,
  },
  label: {
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    marginRight: 3
  },
  button: {
    marginTop: 20
  }
})



const Signup = ({ register, loading, isAuthenticated }) => {
  const classes = useStyles();

  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    showpassword: false,
    showPassword2: false,
  });

  const { name, email, password, password2, showpassword, showPassword2 } = values;

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setpasswordError] = useState(false);
  const [password2Error, setPassword2Error] = useState(false);

  const handleChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const handleClickShowpassword = () => {
    setValues({ ...values, showpassword: !showpassword });
  };

  const handleClickShowPassword2 = () => {
    setValues({ ...values, showPassword2: !showPassword2 });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const onSubmit = async e => {
    e.preventDefault();
    setNameError(false);
    setEmailError(false);
    setpasswordError(false);
    setPassword2Error(false);

    if (name == '') {
      setNameError(true)
    }

    if (email == '') {
      setEmailError(true)
    }

    if (password == '') {
      setpasswordError(true)
    }

    if (password2 == '') {
      setPassword2Error(true)
    }

    if (password !== password2) {
      console.log(values)
      // TODO: error handle
    } else {
      register({ name, email, password })
    }
  }

  if (isAuthenticated && !loading) {
    return <Redirect to='/notes' />
  }

  return (

    <Container className={classes.container}>
      <Typography
        variant='h5'
        component='p'
        color='textSecondary'
      >
        Join Diary
      </Typography>

      <Typography
        className={classes.title}
        variant='h4'
        component='h2'
        color='initial'
        gutterBottom
      >
        Create your account
      </Typography>

      <form noValidate autoComplete='off' onSubmit={e => onSubmit(e)}>
        <FormControl className={classes.form} fullWidth variant='outlined'>
          <InputLabel className={classes.label} required><PersonIcon className={classes.icon} fontSize='small' />Name</InputLabel>
          <OutlinedInput
            value={name}
            error={nameError}
            onChange={handleChange('name')}
            labelWidth={78}
          />
          {nameError ? <FormHelperText>Name is required</FormHelperText> : null}
        </FormControl>

        <FormControl className={classes.form} fullWidth variant='outlined'>
          <InputLabel className={classes.label} required><EmailIcon className={classes.icon} fontSize='small' />Email</InputLabel>
          <OutlinedInput
            value={email}
            error={emailError}
            onChange={handleChange('email')}
            labelWidth={75}
          />
          {emailError ? <FormHelperText>Email is required</FormHelperText> : null}
        </FormControl>

        <FormControl className={classes.form} fullWidth variant='outlined'>
          <InputLabel className={classes.label} required><LockIcon className={classes.icon} fontSize='small' />Password</InputLabel>
          <OutlinedInput
            type={showpassword ? 'text' : 'password'}
            value={password}
            error={passwordError}
            onChange={handleChange('password')}
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
            labelWidth={105}
          />
          {passwordError ? <FormHelperText>Password is required</FormHelperText> : null}
          {/* TODO:
              conditional render when passwords not match
          */}
        </FormControl>

        <FormControl className={classes.form} fullWidth variant='outlined'>
          <InputLabel className={classes.label} required><LockIcon className={classes.icon} fontSize='small' />Confirm password</InputLabel>
          <OutlinedInput
            type={showPassword2 ? 'text' : 'password'}
            value={password2}
            error={password2Error}
            onChange={handleChange('password2')}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  onClick={handleClickShowPassword2}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {showPassword2 ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={170}
          />
          {password2Error ? <FormHelperText>Password is required</FormHelperText> : null}
          {/* TODO:
              conditional render when passwords not match
          */}
        </FormControl>

        <Button
          className={classes.button}
          // disabled
          type='submit'
          color='primary'
          variant='contained'
          endIcon={<KeyboardArrowRight />}
        >
          Create account
      </Button>
      </form>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { register })(Signup)