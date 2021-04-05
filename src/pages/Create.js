import React from 'react'
import { Typography, Button, ButtonGroup, Container } from '@material-ui/core';
import { KeyboardArrowRight } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  btn: {
    fontSize: 60,
    backgroundColor: 'violet',
    '&:hover': {
      backgroundColor: 'blue'
    }
  },

  title: {
    textDecoration: 'underline',
    marginBottom: '20px'
  }
});

export default function Create() {

  const classes = useStyles();

  return (
    <Container>
      <Typography
        className={classes.title}
        variant='h6'
        component='h2'
        color='textSecondary'
        gutterBottom
      >
        Create a new Note
      </Typography>

      <Button
        className={classes.btn}
        type='submit'
        color='secondary'
        variant='contained'
        endIcon={<KeyboardArrowRight />}
      >
        Submit
      </Button>

      <br />
      <KeyboardArrowRight
        color='primary'
        fontSize='large'
        component='span'
      />
    </Container>
  )
}
