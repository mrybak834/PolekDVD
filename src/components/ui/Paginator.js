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

class Paginator extends React.Component {

    state = {
      firstPageDisabled: true,
      lastPageDisabled: true,
    };

    setPages(){

    }

    componentDidMount(){
      this.setPages();
    }

    render(){
        const { classes } = this.props;

        return (
          <div className={this.props.classes.bottom}>
            <Button variant="outlined" color="primary" disabled={this.state.firstPageDisabled} className={classes.button}>
              &lt;&lt;
            </Button>
            <Button color="primary" className={classes.button}>
              1
            </Button>
            <Button color="primary" className={classes.button}>
              {this.props.dashboardInfo.current}
            </Button>
            <Button color="primary" className={classes.button}>
              3
            </Button>
            <Button variant="outlined" color="primary" disabled={this.state.firstPageDisabled} className={classes.button}>
              &gt;&gt;
            </Button>
          </div>
        );
    }
}


Paginator.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Paginator);