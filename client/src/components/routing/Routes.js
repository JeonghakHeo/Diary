import { Route, Switch } from 'react-router-dom'
import Layout from '../layout/Layout'
import Notes from '../../pages/Notes'
import Create from '../../pages/Create'
import NotFound from '../layout/NotFound'
import PrivateRoute from '../routing/PrivateRoute';
export const Routes = () => {

  return (
    <>
      <Switch>
        <PrivateRoute>
          <Layout>
            <PrivateRoute exact path='/note' component={Notes} />
            <PrivateRoute exact path='/create' component={Create} />
          </Layout>
        </PrivateRoute>
        <Route path='*' component={NotFound} />
      </Switch>
    </>
  )
}

export default Routes