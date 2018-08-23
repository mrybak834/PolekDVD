import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBarUI from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MovieIcon from '@material-ui/icons/LocalMovies';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
});

function AppBar(props) {
  const { classes } = props;
  return (
    <React.Fragment >
      <AppBarUI position="static" className={classes.appBar}>
        <Toolbar>
          <MovieIcon className={classes.icon} />
          <Typography variant="title" color="inherit" noWrap>
            PolekDVD
          </Typography>
        </Toolbar>
      </AppBarUI>
    </React.Fragment>
  );
}

AppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppBar);