import React from 'react';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux'
import logo from './logo.png';
import {showProcessList} from '../actions'



const styles = {
  logo : {
    boxSizing: 'border-box',
    marginBottom: 32,
    width: 350
  },
  title : {
    fontWeight: 300,
    color: 'white'
  }
};

function Splash(props) {
  const { showProcessList } = props;

  return (
        <div onClick = { () => showProcessList() } className="animated fadeIn">
          <img src={logo} alt="logo"  style={styles.logo}/>
          <h2 style={styles.title}>Click Anywhere to Start Enabling Things!!!.</h2>
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
    showProcessList: () => {
        dispatch(showProcessList())
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Splash));