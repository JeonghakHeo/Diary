import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { editNote, getNote } from '../actions/note'
import { useHistory } from 'react-router-dom';
import { Typography, Button, Container, FormControlLabel, FormLabel, FormControl } from '@material-ui/core';
import { Radio, RadioGroup } from '@material-ui/core';
import { KeyboardArrowRight } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    width: '600px',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    height: '360px'
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);


// 
const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  }
})



const Edit = ({ getNote, editNote, note: { loading, note }, match }) => {
  useEffect(() => {
    getNote(match.params.id)
  }, [getNote])

  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState('todos');
  const [open, setOpen] = useState(false);
  const history = useHistory();


  const handleClose = () => {
    setOpen(false);
    editNote({ title, details, category }, history, note._id)
  };

  const onSubmit = e => {
    e.preventDefault();
    setOpen(true)
    // if (title == '' ? setTitleError(true) : setTitle(note.title))
    if (title == '') {
      setTitle(note.title)
    }

    if (details == '') {
      setDetails(note.details)
    }
    // if (details == '' ? setDetailsError(true) : setDetails(note.details))


    // if (title && details && category) {
    //   editNote({ title, details, category }, history, note._id)
    // }
  }

  // TODO: loading handle
  return loading || note == null ? (<div>Loading...</div>) : (
    <Container>
      <Typography
        className={classes.title}
        variant='h6'
        component='h2'
        color='textSecondary'
        gutterBottom
      >
        Edit the note
      </Typography>

      <form noValidate autoComplete="off" onSubmit={onSubmit}>
        <TextField
          onChange={e => setTitle(e.target.value)}
          className={classes.field}
          label='Note title'
          defaultValue={note.title}
          InputLabelProps={{
            shrink: true,
          }}
          color='primary'
          variant='outlined'
          fullWidth
          error={titleError}
          required
        />

        <TextField
          onChange={e => setDetails(e.target.value)}
          className={classes.field}
          label='Note details'
          defaultValue={note.details}
          InputLabelProps={{
            shrink: true,
          }}
          color='primary'
          variant='outlined'
          fullWidth
          multiline
          rows={4}
          error={detailsError}
          required
        />

        <FormControl className={classes.field} color='primary'>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup value={category} onChange={e => setCategory(e.target.value)}>
            <FormControlLabel value='money' control={<Radio color='primary' />} label='Money'></FormControlLabel>
            <FormControlLabel value='todos' control={<Radio color='primary' />} label='Todos'></FormControlLabel>
            <FormControlLabel value='reminders' control={<Radio color='primary' />} label='Reminders'></FormControlLabel>
            <FormControlLabel value='work' control={<Radio color='primary' />} label='Work'></FormControlLabel>
          </RadioGroup>
        </FormControl>
        <Button
          className={classes.btn}
          onSubmit={e => onSubmit(e)}
          type='submit'
          color='primary'
          variant='contained'
          endIcon={<KeyboardArrowRight />}
        >
          Save
      </Button>
      </form>
      <div>
        <Dialog className={classes.dialog} onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            {note.title}
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              {note.details}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Save changes
          </Button>
          </DialogActions>
        </Dialog>
      </div>
    </Container >
  )
}

const mapStateToProps = state => ({
  note: state.note
})

export default connect(mapStateToProps, { getNote, editNote })(Edit)

