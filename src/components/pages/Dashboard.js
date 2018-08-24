import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '../ui/AppBar';
import Hero from '../ui/Hero';
import Grid from '../ui/Grid';

const styles = theme => ({
  main: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
});

const Dashboard = (props) => {
  const { classes } = props;
  return (
  <React.Fragment >
    <main className={classes.main}>
      <AppBar />
      <Hero />
      {/* <InsetList /> */}
      <Grid />
    </main>
  </React.Fragment>);
};

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);