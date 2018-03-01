import React, { Component } from 'react';
import { Button } from 'material-ui';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux'
import {newEnablement} from './actions'

const styles = theme => ({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
});

function Kiosk(props) {
  const { classes, count, onNewEnablement } = props;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <div className="kiosk-container">
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title}>Word of the Day</Typography>
          <Typography component="p">
            Current State: {count || 0}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="raised" size="small" onClick={onNewEnablement}>Add Count</Button>
        </CardActions>
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
  return {
    onNewEnablement: () => {
      dispatch(newEnablement())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Kiosk));