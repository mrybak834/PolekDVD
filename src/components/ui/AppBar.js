import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBarUI from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MovieIcon from '@material-ui/icons/LocalMovies';
import LoginDialog from './LoginDialog';

const styles = (theme) => ({
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

function AppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBarUI position="static">
        <Toolbar>
            <MovieIcon className={classes.icon}/>
          <Typography variant="title" color="inherit" className={classes.flex}>
            PolekDVD
          </Typography>
          <LoginDialog />
        </Toolbar>
      </AppBarUI >
    </div>
  );
}

AppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppBar);