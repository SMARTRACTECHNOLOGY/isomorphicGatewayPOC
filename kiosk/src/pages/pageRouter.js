import React from 'react';
import Grid from 'material-ui/Grid';
import {connect} from "react-redux";
import { Landing, Login } from '.';

let style = {
  'backgroundColor': `rgb(3, 86, 109)`,
  width: '100%',
  height: '100%',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  alignContent: 'center',
  overflow: 'auto'
};


function PageRouter(props) {
  let page = props.page;

  let currentPageComponent = <Login/>;

  switch (page) {
    case "LOGIN":
      currentPageComponent = <Login/>;
      break;
    case "LANDING":
      currentPageComponent = <Landing/>;
      break;
    default:
  }

  console.log(page);

  return (<Grid container className="kiosk-container" style={style}>
    {currentPageComponent}
  </Grid>)
}


const mapStateToProps = (state, ownProps) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(PageRouter);