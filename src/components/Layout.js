import React from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles, Drawer, Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { AddCircleOutlined, SubjectOutlined } from '@material-ui/icons';
import AppBar from '@material-ui/core/AppBar'
import ToolBar from '@material-ui/core/Toolbar'
import Avatar from '@material-ui/core/Avatar';
import { format } from 'date-fns'
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
      width: `calc(100% - ${drawerWidth}px)`
    },
    toolbar: theme.mixins.toolbar,
    date: {
      flexGrow: 1
    },
    avatar: {
      marginLeft: theme.spacing(2)
    }
  }
}
)

const Layout = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

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
    }
  ];

  return (
    <div className={classes.root}>

      {/* app bar */}
      <AppBar className={classes.appbar} elevation={0}>
        <ToolBar>
          <Typography className={classes.date}>
            Today is {format(new Date, 'do MMMM Y')}
          </Typography>
          <Typography>
            Mario
          </Typography>
          <Avatar src='Logo.png' className={classes.avatar} />
        </ToolBar>
      </AppBar>
      {/* side drawer */}
      <Drawer
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor='left'
        variant='permanent'>
        <div>
          <Typography className={classes.title} variant='h5'>
            Ninja Notes
          </Typography>
        </div>

        {/* List  */}
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
