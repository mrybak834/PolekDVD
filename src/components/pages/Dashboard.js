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
    current: 2,
    moviesPerPage: 12,
    lastMovieSeen: 0
  }

  updateLastSeen = (id) => {
    this.setState((prevState) => ({
      ...prevState,
      lastMovieSeen: id
    }));
  };

  changePage = (nextPage) => {
    this.setState((prevState) => ({
      ...prevState,
      current: nextPage
    }));
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment >
          <AppBar />
          <Hero />
          {/* <SearchOptions /> */}
          <Grid pageInfo={this.state} updateLastSeenHandler={this.updateLastSeen}/>
          <Paginator pageInfo={this.state} changePageHandler={this.changePage}/>
      </React.Fragment>
    );
  }
}


Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);