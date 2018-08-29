import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import database from '../../firebase/firebase';
import Navigator from './Navigator';

const styles = theme => ({
  bottom: {
    display: "flex",
    flexGrow: 1,
    justifyContent: 'center',
    bottom: 0,
    margin: 'auto',
    paddingBottom: 20,
  },
  button: {
    [theme.breakpoints.down(400)]: {
      minWidth: 50,
    },
  },
});

class Paginator extends React.Component {
  state = {
    lastPage: true,
  };

  paginateHandler(){
    const { classes } = this.props;

    //Get first movie
    database.ref('movies')
    .limitToLast(1)
    .once('value')
    .then((snapshotIndex) => {
      const highestKey = Object.keys(snapshotIndex.val())[0];
      const nextPageIndex = highestKey - ((this.props.pageInfo.current + 1) * this.props.pageInfo.moviesPerPage) + 1;

      // Get potential next page
      database.ref('movies')
        .orderByKey()
        .startAt(nextPageIndex.toString())
        .limitToFirst(this.props.pageInfo.moviesPerPage)
        .once('value')
        .then((snapshotPage) => {
          const data = snapshotPage.val();

          // If the last result from the current page = the last result of the next page, there is nothing left to show
          if (this.props.pageInfo.lastMovieSeen == Object.keys(data)[0]){


            if (this.state.lastPage === false){
              this.setState(() => ({
                lastPage: true,
              }));
            };

            return;
          }

          if (this.state.lastPage === true){
            this.setState(() => ({
              lastPage: false,
            }));
          };

          return;
        });
    });
  }

  componentDidUpdate(){
    this.paginateHandler();
  }

  render(){
      const { classes } = this.props;

      return (
        <Navigator changePageHandler={this.props.changePageHandler} current={this.props.pageInfo.current} lastPage={this.state.lastPage}/>
      );
  }
}


Paginator.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Paginator);