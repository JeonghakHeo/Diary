import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import { Button, Typography, Box } from '@material-ui/core'

const Landing = () => {

  return (
    <>
      <Navbar />
      <section className='landing'>
        <div className='landing container'>
          <img src='/images/welcome.png' className='landing-image' />
          <div>
            <Typography variant='h2' component='h1' gutterBottom>Welcome to Diary!</Typography>
            <Typography variant='h5' component='p' color='textSecondary' gutterBottom>Create your perosnal diary & notes</Typography>
            <Typography variant='h5' component='p' color='textSecondary' gutterBottom>A simply organized note board for your favor.</Typography>
          </div>
          <div className='buttons'>
            <Link to='/note'>
              <Box component='span' mx={1}>
                <Button variant='contained'>Learn more</Button>
              </Box>
            </Link>
            <Link to='/login'>
              <Box component='span' mx={1}>
                <Button variant='contained' color='primary'>Get started</Button>
              </Box>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Landing
