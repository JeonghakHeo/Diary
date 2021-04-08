import { useHistory, useLocation } from 'react-router-dom';
import { fade, makeStyles, Drawer, Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { AddCircleOutlined, SubjectOutlined } from '@material-ui/icons';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import { format } from 'date-fns';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: 'flex'
    },
    drawer: {
      width: drawerWidth
    },
    drawerPaper: {
      width: drawerWidth
    },
    page: {
      backgroundColor: '#f9f9f9',
      width: '100%',
      padding: theme.spacing(3)
    },
    active: {
      backgroundColor: '#f4f4f4'
    },
    title: {
      padding: theme.spacing(2)
    },
    appbar: {
      backgroundColor: 'white',
      color: 'rgba(0, 0, 0, 0.87)',
      width: `calc(100% - ${drawerWidth}px)`,
      paddingBottom: '8px'
    },
    toolbar: theme.mixins.toolbar,
    date: {
      flexGrow: 1
    },
    avatar: {
      marginLeft: theme.spacing(2)
    },
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
    }
  }
}
)

const Layout = ({ children, notes }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const date = new Date;
  let hours = date.getHours();

  console.log(notes);
  const menuItems = [
    {
      title: 'My notes',
      icon: <SubjectOutlined color='primary' />,
      path: '/'
    },
    {
      title: 'Create',
      icon: <AddCircleOutlined color='primary' />,
      path: '/create'
    },

  ];

  const handleSearch = (term) => {
    // if(note.title.contains(term)) {
    // show filtered Notes
    // }
  }

  return (
    <div className={classes.root}>

      {/* App bar */}
      <AppBar className={classes.appbar} elevation={0}>
        <ToolBar>
          <Typography className={classes.date}>
            Today is {format(new Date, 'do MMMM Y')}
          </Typography>

          {/* Search Tab */}
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              onChange={handleSearch}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>

          <Typography>
            {(hours < 12) ? "Good Morning" :
              ((hours >= 12 && hours <= 18) ? "Good Afternoon" : " Good Evening")} Jeonghak!
          </Typography>
          <Avatar src='Me.jpg' className={classes.avatar} />
        </ToolBar>
      </AppBar>

      {/* Side Drawer */}
      <Drawer
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor='left'
        variant='permanent'>
        <div>
          <Typography className={classes.title} variant='h5'>
            Diary
          </Typography>
        </div>

        {/* List */}
        <List>
          {menuItems.map(item => (
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

      </Drawer>

      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  )
}

export default Layout
