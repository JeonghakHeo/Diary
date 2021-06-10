// import React from 'react'
// import Snackbar from "@material-ui/core/Snackbar";
// import Alert from "@material-ui/lab/Alert";
// import { makeStyles } from "@material-ui/core/styles";
// import { connect } from 'react-redux';

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: "100%",
//     "& > * + *": {
//       marginTop: theme.spacing(2)
//     }
//   }
// }));

// const SnackBar = ({ snackbar: { open, type, msg } }) => {
//   const classes = useStyles();
//   const handleClose = (e, reason) => {
//     if (reason === "clickaway") {
//       return;
//       // TODO: close handle
//     }
//   };

//   return (
//     <div className={classes.root}>
//       <Snackbar
//         open={open}
//         autoHideDuration={3000}
//         onClose={handleClose}
//       >
//         <Alert
//           elevation={6}
//           variant="filled"
//           onClose={handleClose}
//           color={type}
//         >
//           {msg}
//         </Alert>
//       </Snackbar>
//     </div>
//   );
// };

// const mapStateToProps = state => ({
//   snackbar: state.snackbar
// })

// export default connect(mapStateToProps)(SnackBar);

import React from 'react'
import { useState } from 'react'
import { connect } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles'

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  snackbar: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const CustomSnackbar = ({ snackbar: { isOpen, type, msg } }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <div className={classes.snackbar}>
      <Snackbar open={isOpen} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type}>
          {msg}
        </Alert>
      </Snackbar>
    </div>
  )
}

const mapStateToProps = state => ({
  snackbar: state.snackbar
})

export default connect(mapStateToProps)(CustomSnackbar)
