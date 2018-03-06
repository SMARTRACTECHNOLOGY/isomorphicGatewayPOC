import React from 'react';
import { Button } from 'material-ui';
import { connect } from 'react-redux'
import ProcessStep from './processStep';

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

function ProcessList(props) {
  return (<div style={styles.landing} className="animated fadeInDown">
    <ProcessStep type="NFC"/>
    <ProcessStep type="QR"/>
    <ProcessStep type="BARCODE"/>
  </div>)
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessList);