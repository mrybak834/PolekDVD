import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import GridUI from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import database from '../../firebase/firebase';
import ScrollDialog from './ScrollDialog';

const styles = theme => ({
  container: {
    [theme.breakpoints.down(600)]: {
      display: 'block'
    }
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    height: 'auto',
    // paddingTop: '56.25%', // 16:9
    paddingTop: '80%'
  },
  cardContent: {
    flexGrow: 1,
  },
  truncate: {
    display: 'block',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  hidden: {
    display: 'none',
  },
});

class Grid extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      cards: [],
    };
  }

  loadDBMovies(){
    const cards = [];

    // Get max index
    database.ref('movies')
      .limitToLast(1)
      .once('value')
      .then((snapshotIndex) => {
        const highestKey = Object.keys(snapshotIndex.val())[0];
        const pageIndex = highestKey - (this.props.pageInfo.current * this.props.pageInfo.moviesPerPage) + 1;


        // Get page
        database.ref('movies')
          .orderByKey()
          .startAt(pageIndex.toString())
          .limitToFirst(this.props.pageInfo.moviesPerPage)
          .once('value')
          .then((snapshotPage) => {
            const data = snapshotPage.val();
            
            const movies = Object.keys(data);

            movies.forEach((key) => {
              const movie = data[key];

              if (movie.posterPath == "http://image.tmdb.org/t/p/w500/null"){
                movie.posterPath = "";
              }

              cards.unshift({
                ...movie,
                id: parseInt(key, 10)
              });
            });

            // Check if it is an actual update
            let shouldUpdate = false;
            let i;
            for (i = 0; i < this.state.cards.length; i += 1){
              if (cards[i].id != this.state.cards[i].id){
                shouldUpdate = true;
              }
            }
            
            if (shouldUpdate || this.state.cards.length === 0){
              // Send the last movie seen in order to update paginator
              this.props.updateLastSeenHandler(parseInt(movies[0], 10));

              this.setState(() => ({
                cards
              }));
            }

            return;
          });
      });
  }

  componentDidMount(){
    this.loadDBMovies();
  }

  componentDidUpdate(){
    this.loadDBMovies();
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classNames(classes.layout, classes.cardGrid)}>
        <GridUI container spacing={40} className={classes.container}>
            {this.state.cards.map(card => (
              <GridUI item key={card.id} sm={6} md={4} lg={3} className={classes.grid}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.posterPath ? card.posterPath : "/images/movie.jpg"}
                    title={card.titlePL ? card.titlePL : card.titleEN}
                  />
                  <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="headline" component="div" className={classes.truncate}>
                        {card.titlePL ? card.titlePL : card.titleEN}
                      </Typography>
                      <Typography gutterBottom variant="caption" component="div" className={classes.truncate}>
                        {card.titleEN ? (() => {
                          return card.titlePL ?  card.titleEN : "";
                        })() : ""}
                      </Typography>
                      <Typography>
                        {`${card.rating}★`}
                      </Typography>
                      <Typography className={classes.truncate}>
                        {`${card.year} - ${card.genre}`}
                      </Typography>
                  </CardContent>
                  <CardActions>
                    <ScrollDialog movie={card} addToCartHandler={() => this.props.addToCartHandler(card.id, card.titlePL ? card.titlePL : card.titleEN)}/>
                    <Button onClick={() => this.props.addToCartHandler(card.id, card.titlePL ? card.titlePL : card.titleEN)} size="small" color="primary">
                      Dodaj
                    </Button>
                  </CardActions>
                  </Card>
              </GridUI>
            ))}
            {/* End of card mapping */}
        </GridUI>
      </div>
    )
  }
}


Grid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Grid);