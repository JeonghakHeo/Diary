import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import { Button, Typography, Box } from '@material-ui/core'
import { connect } from 'react-redux'

const Landing = ({ isAuthenticated, loading, user }) => {

  return (
    <>
      <Navbar />
      <section className='landing'>
        <div className='landing container'>
          <img src='/images/welcome.png' className='landing-image' />
          <div>
            {isAuthenticated && !loading ?
              (<Typography variant='h2' component='h1' gutterBottom>Welcome back {user.name}!</Typography>) :
              (<Typography variant='h2' component='h1' gutterBottom>Welcome to Diary!</Typography>)}
            <Typography variant='h5' component='p' color='textSecondary' gutterBottom>Create your perosnal diary & notes</Typography>
            <Typography variant='h5' component='p' color='textSecondary' gutterBottom>A simply organized note board for your favor.</Typography>
          </div>
          <div className='buttons'>
            <Link to='#'>
              <Box component='span' mx={1}>
                <Button variant='contained'>Learn more</Button>
              </Box>
            </Link>
            {isAuthenticated ?
              <Link to='/notes'>
                <Box component='span' mx={1}>
                  <Button variant='contained' color='primary'>Create notes</Button>
                </Box>
              </Link> :
              <Link to='/signup'>
                <Box component='span' mx={1}>
                  <Button variant='contained' color='primary'>Get started</Button>
                </Box>
              </Link>}
          </div>
        </div>
      </section>
    </>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  user: state.auth.user
})

export default connect(mapStateToProps)(Landing)
