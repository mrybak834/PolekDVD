import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
});

function Hero(props) {
  const { classes } = props;
  return (
    <React.Fragment >
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Typography variant="display1" align="center" color="textPrimary" gutterBottom>
              0 przedmiotów w koszyku
            </Typography>
            {/* <Typography variant="title" align="center" color="textSecondary" >
              0 przedmiotów w koszyku
            </Typography> */}
            <div className={classes.heroButtons}>
              <Grid container justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Sprawdż zamówienie
                  </Button>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
    </React.Fragment>
  );
}

Hero.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Hero);