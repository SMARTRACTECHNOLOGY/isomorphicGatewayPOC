import React from 'react';
import { connect } from 'react-redux'
import Card from 'material-ui/Card';
import tickIcon from '../../asserts/tick.svg';

let styles = {
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
  title : {
    marginTop: 20,
  }
};

function Success(props) {

  const { backToProcessList } = props;

  setTimeout(backToProcessList, 1000);

  return (<Card style={styles.card} className="animated bounceIn">
    <img src={tickIcon} alt="tick"/>
    <div style={styles.title}>Enablement Data Uploaded</div>
  </Card>)
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    backToProcessList : () => {
      dispatch({
        type: 'PAGE',
        page: 'PROCESS_LIST'
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Success);