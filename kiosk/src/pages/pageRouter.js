import React from 'react';
import {connect} from "react-redux";
import { Landing, Login, ProcessDetail } from '.';

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
  const { page } = props;

  let currentPageComponent = <Login/>;

  switch (page) {
    case "LOGIN":
      currentPageComponent = <Login/>;
      break;
    case "LANDING":
      currentPageComponent = <Landing/>;
      break;

    case "PROCESS_DETAIL":
      currentPageComponent = <ProcessDetail/>
      break;
    default:
  }

  return (<div className="kiosk-container" style={style}>
    {currentPageComponent}
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

export default connect(mapStateToProps, mapDispatchToProps)(PageRouter);