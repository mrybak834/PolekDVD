import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
});

class SearchOptions extends React.Component {
  state = {
    value: 'one',
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <span>Helo</span>
        <span>Helo2</span>
        <span>Helo3</span>
      </div>
    );
  }
}

SearchOptions.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchOptions);