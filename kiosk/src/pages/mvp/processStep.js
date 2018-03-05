import React from 'react';
import { connect } from 'react-redux'
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import nfcIcon from '../../asserts/nfc.svg';
import barcordIcon from '../../asserts/barcode.svg';
import qrIcon from '../../asserts/qr.svg';


let styles = {
  step : {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap'
  },
  card : {
    margin: 20,
    padding: "25px 50px",
    cursor: 'pointer',
    minWidth: 250,
    minHeight: 250
  },
  image : {
    minWidth: 150,
    minHeight: 150
  },
  NFCImage : {
    width: 115,
    minHeight: 150
  },
  title : {
    marginTop: 20,
  }
};

function ProcessStep(props) {
  const { type } = props;

  let typeComponent = <div>Type ({type}) not supported</div>;

  switch (type) {
    case 'NFC':
      typeComponent = (<div>
        <img src={nfcIcon} alt="NFC logo" style={styles.NFCImage} />
        <div style={styles.title}>Scan NFC</div>
      </div>);
      break;
    case 'BARCODE':
      typeComponent = (<div>
        <img src={barcordIcon} alt="BAR CODE logo" style={styles.image}/>
        <div style={styles.title}>Scan SKU</div>
      </div>);
      break;
    case 'QR':
      typeComponent = (<div>
        <img src={qrIcon} alt="QR logo" style={styles.image}/>
        <div style={styles.title}>Scan QR Code</div>
      </div>);
      break;
    default:
  }

  return (<Card style={styles.card}>
      {typeComponent}
  </Card>)
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessStep);