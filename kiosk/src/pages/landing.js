import React from 'react';
import { Button } from 'material-ui';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux'
import {newEnablement} from '../actions'
import { ProcessCard } from '.';

let styles = {
  landing : {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap'
  },
  card : {
    margin: 20,
    cursor: 'pointer'
  }
}

function Landing(props) {
  const { classes, count, onNewEnablement } = props;

  let cards = [{
    imageUrl: "https://www.adidas.com/dis/dw/image/v2/aaqx_prd/on/demandware.static/-/Sites-adidas-products/en_US/dw24d21a41/zoom/CQ2128_01_standard.jpg?sh=840&strip=false&sw=840",
    name: "Adidas busenitz",
    enablement: {
      total: 200,
      completed: 20
    }
  },
    {
      imageUrl: "https://www.adidas.com/dis/dw/image/v2/aaqx_prd/on/demandware.static/-/Sites-adidas-products/en_US/dw3c05e2f0/zoom/DA9165_01_standard.jpg?sh=840&strip=false&sw=840",
      name: "ULTRABOOST SHOES",
      enablement: {
        total: 300,
        completed: 5
      }
    }, {
      imageUrl: "https://www.adidas.com/dis/dw/image/v2/aaqx_prd/on/demandware.static/-/Sites-adidas-products/en_US/dwd7f20e28/zoom/AH2219_01_standard.jpg?sh=840&strip=false&sw=840",
      name: "HARDEN VOL. 2 SHOES",
      enablement: {
        total: 150,
        completed: 0
      }
    }, {
      imageUrl: "https://www.adidas.com/dis/dw/image/v2/aaqx_prd/on/demandware.static/-/Sites-adidas-products/en_US/dw3b495bc6/zoom/AQ0352_01_standard.jpg?sh=840&strip=false&sw=840",
      name: "SUPERSTAR WHITE ",
      enablement: {
        total: 200,
        completed: 20
      }
    }];

  return (<div className="animated fadeInRight" style={styles.landing}>
      {cards.map(card=> {
        return (
          <div style={styles.card}>
            <ProcessCard cardDetail={card} onEnablement={onNewEnablement} justify="center" key={card.name}/>
          </div>
        )
      })}
  </div>)
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onNewEnablement: (detail) => {
      dispatch(newEnablement(detail))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);