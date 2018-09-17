import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
});

class Login extends React.Component {
  constructor(props){
    super(props);
   }

  render() {
    const { classes } = this.props;
    
    return (<div>Login</div>)
  }
}


Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);