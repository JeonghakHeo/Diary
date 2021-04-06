import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { Avatar, IconButton, Typography } from '@material-ui/core';
import { DeleteOutlined } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core';
import { blue, green, pink, yellow } from '@material-ui/core/colors';
import { Masonry } from 'react-masonry-css';

const useStyles = makeStyles({
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
  }
})

const NoteCard = ({ note, handleDelete }) => {
  const classes = useStyles(note);

  return (
    <div>
      <Card className={classes.card, classes.test} elevation={1}>
        <CardHeader
          avatar={
            <Avatar className={classes.avatar}>{note.category[0].toUpperCase()}</Avatar>
          }
          action={
            <IconButton onClick={() => handleDelete(note.id)}>
              <DeleteOutlined />
            </IconButton>
          }
          title={note.title}
          subheader={note.category}
        />

        <CardContent>
          <Typography variant='body2' color='textSecondary'>
            {note.details}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
}

export default NoteCard
