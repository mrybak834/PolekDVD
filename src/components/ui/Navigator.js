import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';

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



class Navigator extends React.Component {

  constructor(props){
    super(props);

    
  }
  
  pageCount(){
    const { classes } = this.props;

    // First and last page (1 page)
    if (this.props.current === 1 && this.props.lastPage){
      return (
        <Button color="primary" disabled className={classes.button}>
          {this.props.current}
        </Button>
      );
    }
    // First and not last (show button after)
    else if (this.props.current === 1 && !this.props.lastPage){
      return (
        <React.Fragment>
          <Button color="primary" disabled className={classes.button}>
            {this.props.current}
          </Button>
          <Button color="primary" onClick={this.nextPage} className={classes.button}>
            {this.props.current + 1}
          </Button>
        </React.Fragment>
      );
    }
    // Not first and last (show button before)
    else if (this.props.current != 1 && this.props.lastPage){
      return (
        <React.Fragment>
          <Button color="primary" onClick={this.prevPage} className={classes.button}>
            {this.props.current - 1}
          </Button>
          <Button color="primary" disabled className={classes.button}>
            {this.props.current}
          </Button>
        </React.Fragment>
      );
    }
    // Middle
    else {
      return (
        <React.Fragment>
          <Button color="primary" onClick={this.prevPage} className={classes.button}>
            {this.props.current - 1}
          </Button>
          <Button color="primary" disabled className={classes.button}>
            {this.props.current}
          </Button>
          <Button color="primary" onClick={this.nextPage} className={classes.button}>
            {this.props.current + 1}
          </Button>
        </React.Fragment>
      );
    }
  };

  firstPage = () => {
    this.props.changePageHandler(1);
  }

  prevPage = () => {
    this.props.changePageHandler(this.props.current - 1);
  }

  nextPage = () => {
    console.log("clicking");
    this.props.changePageHandler(this.props.current + 1);
  }

  lastPage = () => {
    /**
     * Since there is no firebase support for getting a count of items (without paying, mind),
     *  this can't be implemented for now without a ton of overhead
     */
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.bottom}>
        <Button variant="outlined" onClick={this.firstPage} color="primary" disabled={this.props.current === 1} className={classes.button}>
          &lt;&lt;
        </Button>
        {this.pageCount()}
        <Button variant="outlined" color="primary" disabled={true} className={classes.button}>
          &gt;&gt;
        </Button>
      </div>
    );
  }
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Navigator);