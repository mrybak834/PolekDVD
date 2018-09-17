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

const styles = theme => ({
  cardMedia: {
    height: 'auto',
    // paddingTop: '56.25%', // 16:9
    paddingTop: '56.25%'
  },
  scroll: {
    overflow: 'scroll',
    maxHeight: '22vh',
  }
});

class ScrollDialog extends React.Component {
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
        <Button size="small" color="primary" onClick={this.handleClickOpen('paper')}>Więcej</Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          scroll={this.state.scroll}
          aria-labelledby="scroll-dialog-title"
        >
          <CardMedia
            className={classes.cardMedia}
            image={this.props.movie.backdropPath ? this.props.movie.backdropPath : "/images/movie.jpg"}
            title={this.props.movie.titlePL ? this.props.movie.titlePL : this.props.movie.titleEN}
          />
          <DialogTitle  id="scroll-dialog-title">{this.props.movie.titlePL ? this.props.movie.titlePL : this.props.movie.titleEN}</DialogTitle>
          <DialogContent>
            <DialogContentText variant="subheading">
              <b>
                {this.props.movie.titleEN ? (() => {
                            return this.props.movie.titlePL ?  this.props.movie.titleEN : "";
                          })() : ""}
              </b>
            </DialogContentText>
            <DialogContentText>
              {this.props.movie.description}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Zamknij
            </Button>
            <Button onClick={this.props.addToCartHandler} color="primary">
              Zamów
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ScrollDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ScrollDialog);