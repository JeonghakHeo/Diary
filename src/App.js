import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Notes from './pages/Notes'
import Create from './pages/Create'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import Layout from './components/layout/Layout'
import Landing from './components/layout/Landing'
import NotFound from './components/layout/NotFound'
import { Provider } from 'react-redux'
import store from './store'
import Routes from './components/routing/Routes'
import Signup from './pages/Signup'

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }
})

function App() {
  // const [notes, setNotes] = useState([]);


  // useEffect(() => {
  //   fetch('http://localhost:8000/note')
  //     .then(res => res.json())
  //     .then(data => {
  //       setNotes(data)
  //     })
  // }, [])

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
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
