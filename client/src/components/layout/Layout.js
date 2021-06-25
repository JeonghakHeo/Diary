import { useState } from 'react'
import { useHistory, useLocation, Link } from 'react-router-dom'
import { logout } from '../../actions/auth'
import { fade, makeStyles, Drawer, Typography, Button } from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import { AddCircleOutlined, SubjectOutlined } from '@material-ui/icons'
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Avatar from '@material-ui/core/Avatar'
import Popover from '@material-ui/core/Popover'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import SettingsIcon from '@material-ui/icons/Settings'
import Grid from '@material-ui/core/Grid'
import { format } from 'date-fns'
import Divider from '@material-ui/core/Divider'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'

import { connect } from 'react-redux'
import { search } from '../../actions/search'

const drawerWidth = 240
const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    page: {
      backgroundColor: '#f9f9f9',
      width: '100%',
      padding: theme.spacing(3),
    },
    active: {
      backgroundColor: '#f4f4f4',
      borderRight: '2px solid #3f51b5',
    },
    title: {
      padding: theme.spacing(2),
    },
    appbar: {
      backgroundColor: 'white',
      color: 'rgba(0, 0, 0, 0.87)',
      width: `calc(100% - ${drawerWidth}px)`,
      paddingBottom: '8px',
    },
    toolbar: theme.mixins.toolbar,
    date: {
      flexGrow: 1,
    },
    avatar: {
      marginRight: theme.spacing(2),
      marginLeft: theme.spacing(2),
      '&:hover': {
        cursor: 'pointer',
      },
    },
    dividedList: {
      marginTop: '365px',
    },

    // ** Search Tab ** //
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },

    // ** Popover ** //
    button: {
      '&:hover': {
        backgroundColor: 'transparent',
        color: '#007791',
      },
    },
    dropdown: {
      display: 'flex',
      alignItems: 'center',
    },
    exitIcon: {
      marginRight: '5px',
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      alignContent: 'flex-start',
      padding: '10px 20px',
    },
    typography: {
      '&:hover': {
        color: '#007791',
      },
    },
    gridContainer: {
      display: 'flex',
      alignItems: 'center',
      textAlign: 'left',
      borderBottom: '1px solid #eee',
      marginBottom: '10px',
      '&:hover': {
        cursor: 'pointer',
      },
    },
    avatarLarge: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    },
  }
})

const Layout = ({
  children,
  notes,
  user,
  isAuthenticated,
  loading,
  logout,
  search,
}) => {
  const classes = useStyles()
  const history = useHistory()
  const location = useLocation()

  const date = new Date()
  let hours = date.getHours()

  const [searchValue, setSearchValue] = useState('')

  const handleSearch = (e) => {
    const searchValue = e.target.value
    setSearchValue(searchValue.toLowerCase())

    const newNotes = notes.filter((note) => {
      if (searchValue === '') return true
      return note.title.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
    })

    console.log(newNotes)
    search(newNotes)
  }

  const menuItems = [
    {
      title: 'My notes',
      icon: <SubjectOutlined color='primary' />,
      path: '/notes',
    },
    {
      title: 'Create',
      icon: <AddCircleOutlined style={{ color: '#fbc02d' }} />,
      path: '/create',
    },
    {
      title: 'Calendar',
      icon: <CalendarTodayIcon color='secondary' />,
      path: '/calendar',
    },
  ]

  const menuItemsBelow = [
    {
      title: 'Settings',
      icon: <SettingsIcon style={{ color: '#607d8b' }} />,
      path: '#',
    },
    {
      title: 'Logout',
      icon: <ExitToAppIcon style={{ color: '#4caf50' }} />,
      path: '#',
    },
  ]

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return loading ? (
    ''
  ) : (
    <div className={classes.root}>
      {/* App bar */}
      <AppBar className={classes.appbar} elevation={0}>
        <ToolBar>
          <Typography className={classes.date}>
            Today is {format(new Date(), 'do MMMM Y')}
          </Typography>

          {/* Search Tab */}
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              value={searchValue}
              onChange={(e) => handleSearch(e)}
              placeholder='Search…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          {isAuthenticated && !loading ? (
            <Typography>
              {hours < 12
                ? 'Good Morning'
                : hours >= 12 && hours <= 18
                ? 'Good Afternoon'
                : ' Good Evening'}{' '}
              {user.name[0].toUpperCase() +
                user.name.slice(1, user.name.length)}
              !
            </Typography>
          ) : (
            ''
          )}

          {/* Popover */}
          <Avatar
            src='/images/me.jpg'
            className={classes.avatar}
            onClick={handleClick}
          />
          <Popover
            id={id}
            open={open}
            className={classes.popover}
            anchorEl={anchorEl}
            anchorReference='anchorPosition'
            anchorPosition={{ top: 75, left: 1400 }}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <div className={classes.container}>
              <div>
                <Grid container spacing={2} className={classes.gridContainer}>
                  <Grid item>
                    <Avatar
                      src='/images/me.jpg'
                      className={classes.avatarLarge}
                    />
                  </Grid>
                  <Grid item>
                    <Typography className={classes.typography} variant='h6'>
                      {user.name}
                    </Typography>
                    <Typography>{user.email}</Typography>
                  </Grid>
                  {/* <Button className={classes.button}>
                  <div className={classes.dropdown}>
                  </div>
                </Button> */}
                </Grid>
              </div>

              <div>
                <Button className={classes.button}>
                  <div className={classes.dropdown} onClick={logout}>
                    <ExitToAppIcon
                      fontSize='small'
                      className={classes.exitIcon}
                      onClick={logout}
                    />
                    <Typography onClick={logout}>Logout</Typography>
                  </div>
                </Button>
              </div>
            </div>
          </Popover>
        </ToolBar>
      </AppBar>

      {/* Side Drawer */}
      <Drawer
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor='left'
        variant='permanent'
      >
        <div>
          <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
            <Typography className={classes.title} variant='h5'>
              Diary
            </Typography>
          </Link>
        </div>

        {/* List */}
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.title}
              onClick={() => history.push(item.path)}
              className={location.pathname == item.path ? classes.active : null}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
        <div className={classes.dividedList}>
          <List>
            {menuItemsBelow.map((item) => (
              <ListItem
                button
                key={item.title}
                onClick={() => history.push(item.path)}
                className={
                  location.pathname == item.path ? classes.active : null
                }
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>

      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notes: state.note.notes,
    user: state.auth.user,
    loading: state.auth.loading,
    isAuthenticated: state.auth.isAuthenticated,
  }
}

export default connect(mapStateToProps, { logout, search })(Layout)
