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
  /**
   * ToDO:
   * consider ✔️
   * 1
   * 2
   * 3
   * 4
   * pages
   */
  state = {
    current: 1,
    first: true,
    last: false,
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment >
          <AppBar />
          <Hero />
          <SearchOptions />
          <Grid dashboardInfo={this.state}/>
          <Paginator dashboardInfo={{current: 5}}/>
      </React.Fragment>
    );
  }
}


Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);