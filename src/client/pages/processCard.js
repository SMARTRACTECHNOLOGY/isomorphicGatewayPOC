import React from 'react';
import { Button } from 'material-ui';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux'

const styles = {
  card: {
    minWidth: 275,
  },
  title: {
    fontSize: 15,
    fontWeight: 500
  },
  media : {
    height: 250
  },
  content : {
    textAlign: 'left'
  },
  description : {
    fontSize: 13,
    color: 'gray'
  }
};

function ProcessCard(props) {
  const { classes, cardDetail, onProcessDetail } = props;

  return (
    <div onClick={() => { if(onProcessDetail) { onProcessDetail(cardDetail) }}}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={cardDetail.imageUrl}
          title={cardDetail.name}
        />
        <CardContent className={classes.content}>
          <div className={classes.title}>
            {cardDetail.name}
          </div>
          <p className={classes.description}>
            {cardDetail.enablement.completed}/{cardDetail.enablement.total} EABLEMENTS
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProcessCard));