import { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import NoteCard from '../components/NoteCard';
import Masonry from 'react-masonry-css';
import { connect } from 'react-redux';


const Notes = ({ notes, setNotes, data }) => {


  const handleDelete = async (id) => {
    await fetch('http://localhost:8000/note/' + id, {
      method: 'DELETE'
    })

    const newNotes = notes.filter(note => note.id !== id);
    setNotes(newNotes)
  };
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
          data.map(data => (
            <div key={data.id}>
              <NoteCard note={data} handleDelete={handleDelete} />
            </div>
          ))
        }
      </Masonry>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    data: state.search.data
  }
}

export default connect(mapStateToProps)(Notes)