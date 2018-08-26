import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '../ui/AppBar';
import Hero from '../ui/Hero';
import Grid from '../ui/Grid';
import SearchOptions from '../ui/SearchOptions';
import Paginator from '../ui/Paginator';

const styles = theme => ({
});

class Dashboard extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment >
          <AppBar />
          <Hero />
          <SearchOptions />
          <Grid info={{page: 1}}/>
          <Paginator info={{current: 5}}/>
      </React.Fragment>
    );
  }
}


Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);