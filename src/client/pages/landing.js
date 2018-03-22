import React from 'react';
import { connect } from 'react-redux'
import {showProcessDetail} from '../../shared/actions'
import { ProcessCard } from './index';

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
};

function Landing(props) {
  const { showProcessDetail, cards } = props;

  return (<div className="animated fadeInRight" style={styles.landing}>
      {cards.map(card=> {
        return (
          <div style={styles.card}>
            <ProcessCard cardDetail={card} onProcessDetail={showProcessDetail} justify="center" key={card.name}/>
          </div>
        )
      })}
  </div>)
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    showProcessDetail: (detail) => {
      console.log("detail is ====>");
      console.log(detail);
      dispatch(showProcessDetail(detail))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);