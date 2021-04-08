import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Notes from './pages/Notes'
import Create from './pages/Create'
import { createMuiTheme, ThemeProvider } from '@material-ui/core'
import Layout from './components/Layout'

import { Provider } from 'react-redux';
import store from './store'

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
  const [notes, setNotes] = useState([]);


  useEffect(() => {
    fetch('http://localhost:8000/note')
      .then(res => res.json())
      .then(data => {
        setNotes(data)
      })
  }, [])

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Layout notes={notes}>
            <Switch>
              <Route exact path="/">
                <Notes notes={notes} setNotes={setNotes} />
              </Route>
              <Route path="/create">
                <Create />
              </Route>
            </Switch>
          </Layout>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
