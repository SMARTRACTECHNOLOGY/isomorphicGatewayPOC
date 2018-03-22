import React from 'react';
import { connect } from 'react-redux'
import Card from 'material-ui/Card';
import nfcIcon from '../../asserts/nfc.svg';
import barcordIcon from '../../asserts/barcode.svg';
import qrIcon from '../../asserts/qr.svg';
import tickIcon from '../../asserts/tick.svg';


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
  tickImage : {
    width: 210,
    opacity: 0.8,
    position: 'absolute',
    right: 20,
    top: 20
  },
  title : {
    marginTop: 20,
  }
};

function ProcessStep(props) {
  const { type, nfcStatus, qrStatus, barCodeStatus } = props;
  console.log(nfcStatus);

  let typeComponent = <div>Type ({type}) not supported</div>;
  let ticked = false;


  switch (type) {
    case 'NFC':
      ticked = nfcStatus;
      typeComponent = (<div>
        <img src={nfcIcon} alt="NFC logo" style={styles.NFCImage} />
        <div style={styles.title}>Scan NFC</div>
      </div>);
      break;
    case 'BARCODE':
      ticked = barCodeStatus;
      typeComponent = (<div>
        <img src={barcordIcon} alt="BAR CODE logo" style={styles.image}/>
        <div style={styles.title}>Scan SKU</div>
      </div>);
      break;
    case 'QR':
      ticked = qrStatus;
      typeComponent = (<div>
        <img src={qrIcon} alt="QR logo" style={styles.image}/>
        <div style={styles.title}>Scan QR Code</div>
      </div>);
      break;
    default:
  }

  return (<Card style={styles.card} className={ticked ? "animated tada" : ""}>
      {typeComponent}
      {ticked && <img src={tickIcon} alt="tick" style={styles.tickImage}/>}
  </Card>)
}

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessStep);