import { useEffect, useState } from 'react'
import { Container } from '@material-ui/core'
import NoteCard from './NoteCard'
import Masonry from 'react-masonry-css'
import { connect } from 'react-redux'
import { getCurrentUsersNotes } from '../actions/note'

const Notes = ({
  getCurrentUsersNotes,
  note: { notes, loading },
  searchedNotes,
}) => {
  useEffect(() => {
    getCurrentUsersNotes()
  }, [getCurrentUsersNotes])

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  }

  return !loading && notes.length !== 0 && searchedNotes.length == 0 ? (
    <Container>
      <Masonry
        breakpointCols={breakpoints}
        className='my-masonry-grid'
        columnClassName='my-masonry-grid_column'
      >
        {notes.map((note) => (
          <div key={note._id}>
            <NoteCard note={note} />
          </div>
        ))}
      </Masonry>
    </Container>
  ) : (
    <Container>
      {/* <Masonry
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
        </Masonry> */}
      <h2>Create your first note!</h2>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    note: state.note,
    searchedNotes: state.search.searchedNotes,
  }
}

export default connect(mapStateToProps, { getCurrentUsersNotes })(Notes)
