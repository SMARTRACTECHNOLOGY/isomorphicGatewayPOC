import React from 'react';
import { connect } from 'react-redux';
import ProcessStep from './processStep';

const styles = {
  landing: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  card: {
    margin: 20,
    cursor: 'pointer',
  },
};

function ProcessList(props) {
  return (<div style={styles.landing} >
    <div className="animated fadeInLeft"><ProcessStep type="NFC" /></div>
    <div className="animated fadeIn"><ProcessStep type="QR" /></div>
    <div className="animated fadeInRight"><ProcessStep type="BARCODE" /></div>
  </div>);
}

const mapStateToProps = (state, ownProps) => ({
  ...state,
});

const mapDispatchToProps = (dispatch, ownProps) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ProcessList);
