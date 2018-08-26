import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: "flex",
    flexGrow: 1,
    justifyContent: 'center',
    bottom: 0,
    margin: 'auto',
    paddingBottom: 20,
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