import React from 'react';
import { connect } from 'react-redux'
import { ProcessCard } from './index';
import { Button, Icon } from 'material-ui';

let styles = {
  container : {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap'
  },
  closeButton : {
    position: 'absolute',
    right: 3,
    top: 3
  }
};

function ProcessDetail(props) {
  const { currentCard, backToList } = props;

  console.log("currentCard is ");
  console.log(currentCard);

  if(currentCard) {
    return (<div className="animated fadeInRight" style={styles.container}>
      <ProcessCard cardDetail={currentCard}/>
      <Button variant="fab" color="primary" aria-label="back" style={styles.closeButton} onClick={() => backToList()}>
        <Icon>clear</Icon>
      </Button>
    </div>)
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    backToList: () => dispatch({
              "type" : "PAGE",
              "page" : "LANDING"
             })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessDetail);