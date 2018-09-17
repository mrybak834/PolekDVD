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
    maxHeight: '22vh',
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
  }
});

class CartDialog extends React.Component {
  state = {
    open: false,
    scroll: 'paper',
  };

  handleClickOpen = scroll => () => {
    this.setState({ open: true, scroll });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Button disabled={Object.keys(this.props.cart).length === 0} variant="contained" color="primary" onClick={this.handleClickOpen('paper')}>Sprawdż zamówienie</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          scroll={this.state.scroll}
          aria-labelledby="scroll-dialog-title"
        >
          <div className={classes.dialog}>
            <DialogTitle  id="scroll-dialog-title">Koszyk</DialogTitle>
            <DialogContent>
              <CheckboxList cart={this.props.cart}/>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Zamknij
              </Button>
              <Button onClick={this.handleClose} color="primary">
                Zamów
              </Button>
            </DialogActions>
          </div>
        </Dialog>
      </div>
    );
  }
}

CartDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CartDialog);