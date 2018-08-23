import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 2,
    position: "absolute",
    bottom: 0,
    width: "100%"
  },
});

function InsetList(props) {
  const { classes } = props;
  return (
    <footer className={classes.footer}>
        <Typography variant="title" align="center" gutterBottom>
        Footer
        </Typography>
        <Typography variant="subheading" align="center" color="textSecondary" component="p">
        Something here to give the footer a purpose!
        </Typography>
    </footer>
  );
}

InsetList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InsetList);