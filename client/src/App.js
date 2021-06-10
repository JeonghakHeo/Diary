import { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import Landing from './components/layout/Landing'
import NotFound from './components/layout/NotFound'
import { Provider } from 'react-redux'
import store from './store'
import Routes from './components/routing/Routes'
import Signup from './pages/Signup'
import setAuthToken from './utils/setAuthToken'
import { loadUser } from './actions/auth'
import Snackbar from './utils/CustomSnackbar'

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }
})

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          {/* <Snackbar /> */}
          <Switch>
            <Landing exact path='/' />
            <Signup exact path='/signup' />
            <Route component={Routes} />
            <Route path='*' component={NotFound} />
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
