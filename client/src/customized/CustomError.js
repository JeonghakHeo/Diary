import React from 'react'
import { makeStyles } from '@material-ui/core';
import { Typography } from '@material-ui/core'
import CancelIcon from '@material-ui/icons/Cancel';
import FormHelperText from '@material-ui/core/FormHelperText';


const useStyle = makeStyles({
  error: {
    display: 'flex',
    alignItems: 'center'
  }
});

const CustomError = ({ errors }) => {
  const classes = useStyle();

  return (
    errors.map(error => (
      <div key={error.id} className={classes.error}>
        {/* <CancelIcon color='secondary' fontSize='small' /> */}
        {/* <Typography color='secondary'>{error.msg}</Typography> */}
        <FormHelperText>{error.msg} *</FormHelperText>
      </div>
    ))
  )
}

export default CustomError
