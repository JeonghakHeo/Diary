import { useState, useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import Layout from '../layout/Layout'
import Notes from '../../pages/Notes'
import Create from '../../pages/Create'
import NotFound from '../layout/NotFound'
export const Routes = () => {

  const [notes, setNotes] = useState([]);


  useEffect(() => {
    fetch('http://localhost:8000/note')
      .then(res => res.json())
      .then(data => {
        setNotes(data)
      })
  }, [])

  return (
    <>
      <Switch>
        <Layout notes={notes}>
          {/* <Route exact path='/note'><Notes notes={notes} setNotes={setNotes} /></Route> */}
          <Route exact path='/note'><Notes /></Route>
          <Route exact path='/create'><Create /></Route>
        </Layout>
        <Route path='*' component={NotFound} />
      </Switch>
    </>
  )
}

export default Routes