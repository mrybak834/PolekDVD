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
  state = {
    current: 1,
    moviesPerPage: 12,
    lastMovieSeen: 0,
    cart: {},
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

  addToCart = (id, title) => {
    this.setState((prevState) => ({
      ...prevState,
      cart: {
        ...prevState.cart,
        [id]: {
          title
        }
      }
    }))
  }

  removeFromCart = (id) => {
    this.setState((prevState) => {
      const newCart = prevState.cart;
      delete newCart[id];
      
      return {
        ...prevState,
        cart: {
          ...prevState.cart,
        }
      };
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment >
          <AppBar />
          <Hero cart={this.state.cart} removeFromCartHandler={this.removeFromCart} />
          {/* <SearchOptions /> */}
          {/* Updating heroku delete this */}
          <Grid pageInfo={this.state} updateLastSeenHandler={this.updateLastSeen} addToCartHandler={this.addToCart}/>
          <Paginator pageInfo={this.state} changePageHandler={this.changePage}/>
      </React.Fragment>
    );
  }
}


Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);