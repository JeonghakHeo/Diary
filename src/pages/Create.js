import React from 'react'
import { Typography, Button, ButtonGroup, Container } from '@material-ui/core';

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

      <Button type='submit' color='secondary' variant='contained' >Submit</Button>

      {/* <Button variant='contained' color='primary' type='submit'>Submit</Button>
      <Button variant='outlined' color='secondary' type='submit'>Submit</Button>

      <ButtonGroup color='secondary' variant='contained'>
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
      </ButtonGroup> */}
    </Container>
  )
}
