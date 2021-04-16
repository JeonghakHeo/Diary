import { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import NoteCard from '../components/NoteCard';
import Masonry from 'react-masonry-css';
import { connect } from 'react-redux';
import { getNotes } from '../actions/note';

const Notes = ({ getNotes, note: { notes, loading } }) => {
  useEffect(() => {
    getNotes()
  }, [getNotes])


  // const handleDelete = async (id) => {
  //   await fetch('http://localhost:8000/note/' + id, {
  //     method: 'DELETE'
  //   })

  //   const newNotes = notes.filter(note => note.id !== id);
  //   setNotes(newNotes)
  // };

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
  }

  return (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {
          notes.map(note => (
            <div key={note._id}>
              {/* <NoteCard note={note} handleDelete={handleDelete} /> */}
              <NoteCard note={note} />
            </div>
          ))
        }
      </Masonry>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    note: state.note
  }
}

export default connect(mapStateToProps, { getNotes })(Notes)