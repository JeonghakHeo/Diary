import { useState } from 'react';
import { connect } from 'react-redux';
import { createNote } from '../actions/note'
import { useHistory } from 'react-router-dom';
import { Typography, Button, Container, FormControlLabel, FormLabel, FormControl } from '@material-ui/core';
import { Radio, RadioGroup } from '@material-ui/core';
import { KeyboardArrowRight } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  field: {
    marginTop: 20,
    marginBottom: 20,
    display: 'block'
  }
})



const Create = ({ createNote, loading }) => {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const [category, setCategory] = useState('todos');
  const history = useHistory();

  const onSubmit = e => {
    e.preventDefault();
    setTitleError(false);
    setDetailsError(false);

    if (title == '') {
      setTitleError(true)
    }

    if (details == '') {
      setDetailsError(true)
    }

    if (title && details && category) {
      createNote({ title, details, category })
    }

    if (!loading) {
      history.push('/notes')
    }
  }

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

      <form noValidate autoComplete="off" onSubmit={onSubmit}>
        <TextField
          onChange={e => setTitle(e.target.value)}
          className={classes.field}
          label='Note title'
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
          Create
      </Button>
      </form>
    </Container>
  )
}

const mapStateToProps = state => ({
  loading: state.note.loading
})

export default connect(mapStateToProps, { createNote })(Create)

