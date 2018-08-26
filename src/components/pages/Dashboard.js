import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '../ui/AppBar';
import Hero from '../ui/Hero';
import Grid from '../ui/Grid';
import SearchOptions from '../ui/SearchOptions';
import SimpleBottomNavigation from '../ui/SimpleBottomNavigation';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  main: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  center: {

  },
  bottom: {
    display: "flex",
    flexGrow: 1,
    justifyContent: 'center',
    bottom: 0,
    margin: 'auto',
  },
  button: {
    [theme.breakpoints.down(400)]: {
      minWidth: 50
    }
  }
});

const Dashboard = (props) => {
  const { classes } = props;
  return (
  <React.Fragment >
    <main className={classes.main}>
      <AppBar />
      <Hero />
      <SearchOptions />
      <Grid />
      {/* <SimpleBottomNavigation /> */}
      <div className={classes.bottom}>

        <Button variant="outlined" color="primary" className={classes.button}>
          &lt;
        </Button>

        <Button color="primary" className={classes.button}>
          1
        </Button>
        <Button color="primary" className={classes.button}>
          2
        </Button>
        <Button color="primary" className={classes.button}>
          3
        </Button>
        <Button variant="outlined" color="primary" className={classes.button}>
          &gt;
        </Button>
      </div>
    </main>
  </React.Fragment>);
};

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);