import React from 'react';
import { Button } from 'material-ui';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux'
import {newEnablement} from '../actions'

const styles = theme => ({
  card: {
    minWidth: 275,
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
});

function Kiosk(props) {
  const { classes, count, onNewEnablement } = props;

  return (
    <Grid  xs={3}>
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
    </Grid>
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