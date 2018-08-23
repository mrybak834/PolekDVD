import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  heroUnit: {
    display: "flex",
    backgroundColor: theme.palette.background.default,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    // padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 2}px`,
  },
});

function Hero(props) {
  const { classes } = props;
  return (
    <React.Fragment >
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Typography variant="display3" align="center" color="textPrimary" gutterBottom>
              Search
            </Typography>
            <Typography variant="title" align="center" color="textSecondary" paragraph>
              Filters
            </Typography>
          </div>
        </div>
    </React.Fragment>
  );
}

Hero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Hero);