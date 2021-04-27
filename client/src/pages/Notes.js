import { useEffect, useState } from 'react';
import { Container } from '@material-ui/core';
import NoteCard from './NoteCard';
import Masonry from 'react-masonry-css';
import { connect } from 'react-redux';
import { getCurrentUsersNotes } from '../actions/note';

const Notes = ({ getCurrentUsersNotes, note: { notes, loading }, searchedNotes }) => {
  useEffect(() => {
    getCurrentUsersNotes()
  }, [getCurrentUsersNotes])


  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
  }

  return loading && notes === null ? ('waiting') :
    (
      <Container>
        <Masonry
          breakpointCols={breakpoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {
            searchedNotes.map(note => (
              <div key={note._id}>
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
    note: state.note,
    searchedNotes: state.search.searchedNotes
  }
}

export default connect(mapStateToProps, { getCurrentUsersNotes })(Notes)