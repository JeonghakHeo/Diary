import { useState } from 'react';
import { useHistory } from 'react-router-dom';
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
import axios from 'axios';

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
    marginRight: 5
  },
  button: {
    marginTop: 20
  }
})



const Signup = ({ register, auth }) => {
  const classes = useStyles();
  const history = useHistory();

  const [values, setValues] = useState({
    name: '',
    email: '',
    password1: '',
    password2: '',
    showPassword1: false,
    showPassword2: false,
  });

  const { name, email, password1, password2, showPassword1, showPassword2 } = values;

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [password1Error, setPassword1Error] = useState(false);
  const [password2Error, setPassword2Error] = useState(false);

  // const [errors, setErros] = useState({
  //   nameError: false,
  //   emailError: false,
  //   password1Error: false,
  //   password2Error: false,
  // })

  // const { nameError, emailError, password1Error, password2Error } = errors;


  const handleChange = (prop) => (e) => {
    setValues({ ...values, [prop]: e.target.value });
  };

  const handleClickShowPassword1 = () => {
    setValues({ ...values, showPassword1: !showPassword1 });
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
    setPassword1Error(false);
    setPassword2Error(false);

    if (name == '') {
      setNameError(true)
    }

    if (email == '') {
      setEmailError(true)
    }

    if (password1 == '') {
      setPassword1Error(true)
    }

    if (password2 == '') {
      setPassword2Error(true)
    }

    if (name && email && password1 && password2) {
      console.log(values)
      register({ name, email, password1 })
    }
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
            type={showPassword1 ? 'text' : 'password'}
            value={password1}
            error={password1Error}
            onChange={handleChange('password1')}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  onClick={handleClickShowPassword1}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {showPassword1 ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={105}
          />
          {password1Error ? <FormHelperText>Password is required</FormHelperText> : null}
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
  auth: state.auth
})

export default connect(mapStateToProps, { register })(Signup)