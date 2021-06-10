import { Route, Switch } from 'react-router-dom'
import Layout from '../layout/Layout'
import Notes from '../../pages/Notes'
import Create from '../../pages/Create'
import Edit from '../../pages/Edit'
import Calendar from '../../pages/Calendar'
import NotFound from '../layout/NotFound'
import PrivateRoute from '../routing/PrivateRoute'

const Routes = () => {
  return (
    <>
      <Switch>
        <Layout>
          <PrivateRoute exact path='/notes' component={Notes} />
          <PrivateRoute exact path='/create' component={Create} />
          <PrivateRoute exact path='/edit/:id' component={Edit} />
          <PrivateRoute exact path='/calendar' component={Calendar} />
        </Layout>
        <Route path='*' component={NotFound} />
      </Switch>
    </>
  )
}

export default Routes
