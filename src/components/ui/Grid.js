import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import GridUI from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
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
    paddingTop: '56.25%', // 16:9
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


// TODO
// Make this a stateful class component
// Do ajax calls in componentwillmount
// set up default blank cards in state before ajax call modifies the state

class Grid extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      cards: [{id: 1, title: "Ładuję", description: "Ładuję"},
              {id: 2, title: "Ładuję", description: "Ładuję"},
              {id: 3, title: "Ładuję", description: "Ładuję"},
              {id: 4, title: "Ładuję", description: "Ładuję"},
              {id: 5, title: "Ładuję", description: "Ładuję"},
              {id: 6, title: "Ładuję", description: "Ładuję"},
              {id: 7, title: "Ładuję", description: "Ładuję"},
              {id: 8, title: "Ładuję", description: "Ładuję"},
              {id: 9, title: "Ładuję", description: "Ładuję"},
              {id: 10, title: "Ładuję", description: "Ładuję"},
              {id: 11, title: "Ładuję", description: "Ładuję"},
              {id: 12, title: "Ładuję", description: "Ładuję"}]
    }
  }

  componentWillMount(){
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

  render() {
    return (
      <div className={classNames(this.props.classes.layout, this.props.classes.cardGrid)}>
        <GridUI container spacing={40} className={this.props.classes.container}>
            {this.state.cards.map(card => (
            <GridUI item key={card.id} sm={6} md={4} lg={3} className={this.props.classes.grid}>
              <Card className={this.props.classes.card}>
                <CardMedia
                    className={this.props.classes.cardMedia}
                    image={card.posterPath ? card.posterPath : "/images/movie.jpeg"}
                    title={card.titlePL ? card.titlePL : card.titleEN}
                />
                <CardContent className={this.props.classes.cardContent}>
                    <Typography gutterBottom variant="headline" component="div" className={this.props.classes.truncate}>
                    {card.titlePL ? card.titlePL : card.titleEN}
                    </Typography>
                    <Typography gutterBottom variant="caption" component="div" className={this.props.classes.truncate}>
                    {card.titleEN ? (() => {
                      return card.titlePL ?  card.titleEN : "";
                    })() : ""}
                    </Typography>
                    <Typography>
                    {`${card.rating}★`}
                    </Typography>
                    <Typography className={this.props.classes.truncate}>
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
        </GridUI>
      </div>
    )
  }
}

Grid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Grid);