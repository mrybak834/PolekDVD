import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CheckboxList from './CheckboxList';
import TextField from '@material-ui/core/TextField';
import LoginInfo from './LoginInfo';

const styles = theme => ({
  cardMedia: {
    height: 'auto',
    // paddingTop: '56.25%', // 16:9
    paddingTop: '56.25%',
    paddingLeft: '100%',
    paddingRight: '100%',
  },
  scroll: {
    overflow: 'scroll',
    maxHeight: '40vh',
  },
  dialog: {
    [theme.breakpoints.up(320)]: {
      minWidth: '220px',
    },
    [theme.breakpoints.up(400)]: {
      minWidth: '300px',
    },
    [theme.breakpoints.up(500)]: {
      minWidth: '400px',
    },
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

class LoginDialog extends React.Component {
  state = {
    open: false,
    scroll: 'paper',
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    firstNameValid: true,
    lastNameValid: true,
    phoneValid: true,
    emailValid: true,
  };

  handleClickOpen = scroll => () => {
    this.setState({ open: true, scroll });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = type => event => {
    this.setState({
      [type]: event.target.value,
    });
  };

  handleSubmit = () => {
    /**
     * Name: /^[a-zA-Z]+$/
     * phone: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
     * email: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
     * email(practical): /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
     * email (unicode): /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
     */
    var firstNameValid = true;
    var lastNameValid = true;
    var phoneValid = true;
    var emailValid = true;

    if (! /^[[a-zA-Z\xC0-\uFFFF]+$/.test(this.state.firstName.trim())){
      firstNameValid = false;
    }
    if (! /^[a-zA-Z\xC0-\uFFFF]+$/.test(this.state.lastName.trim())){
      lastNameValid = false;
    }
    if (! /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(this.state.phone.trim())){
      phoneValid = false;
    }
    if (! /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(this.state.email.trim())){
      emailValid = false;
    }

    this.setState((prevState) => ({
      ...prevState,
      firstNameValid,
      lastNameValid,
      phoneValid,
      emailValid,
    }));


  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button  color="inherit" onClick={this.handleClickOpen('paper')}>Zaloguj Się</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          scroll={this.state.scroll}
          aria-labelledby="scroll-dialog-title"
        >
          <div className={classes.dialog}>
            <DialogTitle  id="scroll-dialog-title">Zaloguj Się</DialogTitle>
            <DialogContent >
              <form id="loginForm" className={classes.container} autoComplete="on">
                <TextField
                  id="firstName"
                  label="Imię"
                  className={classes.textField}
                  value={this.state.firstName}
                  onChange={this.handleChange('firstName')}
                  margin="normal"
                  helperText={this.state.firstNameValid ? '' : 'Imię: Jedno słowo, same litery'}
                  error={!this.state.firstNameValid}
                />
                <TextField
                  id="lastName"
                  label="Nazwisko"
                  className={classes.textField}
                  value={this.state.lastName}
                  onChange={this.handleChange('lastName')}
                  margin="normal"
                  helperText={this.state.lastNameValid ? '' : 'Nazwisko: Jedno słowo, same litery'}
                  error={!this.state.lastNameValid}
                />
                <TextField
                  id="phone"
                  label="Telefon"
                  className={classes.textField}
                  value={this.state.phone}
                  onChange={this.handleChange('phone')}
                  margin="normal"
                  helperText={this.state.phoneValid ? '' : 'Telefon: xxx-xxx-xxxx'}
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
                  helperText={this.state.emailValid ? '' : 'Email: Pusty, albo użytkownik@strona.com'}
                  error={!this.state.emailValid}
                />
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Zamknij
              </Button>
              <Button onClick={this.handleSubmit} color="primary">
                Zaloguj
              </Button>
            </DialogActions>
          </div>
        </Dialog>
      </div>
    );
  }
}

LoginDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginDialog);