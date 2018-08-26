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
});

class Grid extends React.Component {

  constructor(props){
    super(props);

    this.loadDummyMovies();
  }

  loadDummyMovies(){
    const dummyMovie = {
      backdropPath: "",
      description: "Ładuję",
      fullTitle: "Ładuję",
      genre: "Ładuję",
      link: "",
      posterPath: "",
      rating: 0,
      titleEN: "Ładuję",
      titlePL: "Ładuję",
      year: 0,
    };

    this.state = {
      cards: [{...dummyMovie, id: 1 },
              {...dummyMovie, id: 2 },
              {...dummyMovie, id: 3 },
              {...dummyMovie, id: 4 },
              {...dummyMovie, id: 5 },
              {...dummyMovie, id: 6 },
              {...dummyMovie, id: 7 },
              {...dummyMovie, id: 8 },
              {...dummyMovie, id: 9 },
              {...dummyMovie, id: 10 },
              {...dummyMovie, id: 11 },
              {...dummyMovie, id: 12 }],
    }
  }

  loadDBMovies(){
    const cards = [];
    database.ref('movies')
      .limitToLast(12)
      .once('value')
      .then((snapshot)=> {
        const data = snapshot.val();

        Object.keys(data).forEach((key) => {
          const movie = data[key];

          cards.unshift({
            ...movie,
            id: parseInt(key, 10)
          });
        });

        this.setState(() => ({
          cards
        }));

        return;
      });
  }

  componentWillMount(){
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
                    <Button size="small" color="primary">
                    Więcej
                    </Button>
                    <Button size="small" color="primary">
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