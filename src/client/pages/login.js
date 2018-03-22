import React from 'react';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux'
import logo from './logo.png';

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

function Login(props) {
  return (
        <div className="animated fadeIn">
          <img src={logo} alt="logo"  style={styles.logo}/>
          <h2 style={styles.title}>Tap your badge to sign in.</h2>
        </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...state
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login));