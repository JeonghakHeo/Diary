import { useState } from 'react'
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import { Avatar, IconButton, Typography } from '@material-ui/core';
import { DeleteOutlined } from '@material-ui/icons';
import { amber, blue, green, pink, yellow } from '@material-ui/core/colors';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import CloseIcon from '@material-ui/icons/Close';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import { connect } from 'react-redux';
import { deleteNote } from '../actions/note';

const useStyles = makeStyles((theme) => {
  return {
    card: {
      height: '320px',
      width: '360px'
    },
    test: {
      border: (note) => {
        if (note.category === 'reminders')
          return '1px solid red'
      }
    },
    avatar: {
      backgroundColor: (note) => {
        if (note.category === 'work') {
          return yellow[700]
        }
        if (note.category === 'todos') {
          return green[500]
        }
        if (note.category === 'reminders') {
          return pink[500]
        }
        return blue[500]
      }
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
      padding: theme.spacing(2, 4, 3),
      textAlign: 'center',
      width: '400px',
      padding: 50,
      paddingTop: 20,
      position: 'absolute',
      top: '20%',
      outline: 'none',
      borderRadius: 4
    },
    delete: {
      fontSize: '100px',
      color: amber[200]
    },
    close: {
      marginLeft: '100%',
      marginBottom: '5%'
    },
    margin: {
      margin: theme.spacing(1)
    },
    padding: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1)
    },
    favorite: {
      color: yellow[500]
    }
  }
})

const NoteCard = ({ note, deleteNote }) => {
  const classes = useStyles(note);
  const [open, setOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFavorite = () => {

    if (isFavorite) {
      setIsFavorite(false)

    } else {
      setIsFavorite(true)
      // change color
    }

  }

  return (
    <div>
      <Card className={classes.card, classes.test} elevation={1}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>{note.category[0].toUpperCase()}</Avatar>
          }
          action={
            <>
              <IconButton onClick={handleOpen}>
                <DeleteOutlined />
              </IconButton>
              <Modal
                aria-labelledby='transition-modal-title'
                aria-describedby='transition-modal-description'
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
                    <div styles={{ position: 'absolute' }} >
                      <IconButton size='small' className={classes.close} onClick={handleClose}><CloseIcon /></IconButton>
                    </div>
                    <ErrorOutlineOutlinedIcon className={classes.delete} />
                    <Typography variant='h5' component='h2' id='transition-modal-title'>Are you sure?</Typography>
                    <Typography component='p' fontSize='1rem' gutterBottom color='textSecondary'>If you delete it, you can't recover it.</Typography>
                    <Button className={classes.margin} variant='contained' color='default' onClick={handleClose}>Cancel</Button>
                    <Button className={classes.margin} variant='contained' color='secondary' onClick={() => deleteNote(note._id)}>Delete</Button>
                  </div>
                </Fade>
              </Modal>
            </>
          }
          title={note.title[0].toUpperCase() + note.title.slice(1, note.title.length)}
          subheader={note.category}
        />

        <CardContent>
          <Typography variant='body2' color='textSecondary'>
            {note.details}
          </Typography>
        </CardContent>

        <CardActions>
          <Link to='/create'>
            <Button size='small' variant='outlined' color='primary'>
              Edit
            </Button>
          </Link>
          <IconButton onClick={handleFavorite} >
            <StarBorderRoundedIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  )
}


export default connect(null, { deleteNote })(NoteCard)

