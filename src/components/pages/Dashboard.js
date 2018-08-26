import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '../ui/AppBar';
import Hero from '../ui/Hero';
import Grid from '../ui/Grid';
import SearchOptions from '../ui/SearchOptions';
import Paginator from '../ui/Paginator';

const styles = theme => ({
  main: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  center: {

  },
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
      <Paginator info={{current: 5}}/>
    </main>
  </React.Fragment>);
};

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);