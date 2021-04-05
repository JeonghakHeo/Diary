import React from 'react'
import { Typography, Button, ButtonGroup, Container } from '@material-ui/core';
import { KeyboardArrowRight } from '@material-ui/icons';

export default function Create() {
  return (
    <Container>
      <Typography
        variant='h6'
        component='h2'
        color='textSecondary'
        gutterBottom
      >
        Create a new Note
      </Typography>

      <Button
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
