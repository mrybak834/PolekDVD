import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    // [theme.breakpoints.up(320)]: {
    //   maxWidth: '220px',
    // },
    // [theme.breakpoints.up(400)]: {
    //   maxWidth: '300px',
    // },
    // [theme.breakpoints.up(500)]: {
    //   maxWidth: '400px',
    // },
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

class LoginInfo extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    firstNameValid: false,
    lastNameValid: false,
    phoneValid: false,
    emailValid: false,
  };

  handleChange = type => event => {
    console.log(type);
    console.log(event.target.value);

    /**
     * Name: /^[a-zA-Z]+$/
     * phone: ^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$
     * email: [a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?
     * email(practical): /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
     */


    this.setState({
      [type]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <form id="loginForm" className={classes.container} autoComplete="on">
        <TextField
          id="firstName"
          label="Imię"
          className={classes.textField}
          value={this.state.firstName}
          onChange={this.handleChange('firstName')}
          margin="normal"
          helperText={this.state.firstNameValid ? '' : 'Error'}
          error={!this.state.firstNameValid}
        />
        <TextField
          id="lastName"
          label="Nazwisko"
          className={classes.textField}
          value={this.state.lastName}
          onChange={this.handleChange('lastName')}
          margin="normal"
          helperText={this.state.lastNameValid ? '' : 'Error'}
          error={!this.state.lastNameValid}
        />
        <TextField
          id="phone"
          label="Telefon"
          className={classes.textField}
          value={this.state.phone}
          onChange={this.handleChange('phone')}
          margin="normal"
          helperText={this.state.phoneValid ? '' : 'Error'}
          error={!this.state.phoneValid}
        />
        <TextField
          id="email"
          label="Email"
          helperText="Opcjonalnie"
          className={classes.textField}
          value={this.state.email}
          onChange={this.handleChange('email')}
          margin="normal"
          helperText={this.state.emailValid ? '' : 'Error'}
          error={!this.state.emailValid}
        />
      </form>
    );
  }
}

LoginInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginInfo);