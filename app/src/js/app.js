import React from 'react';
import { connect } from 'react-redux';
import Home from './views/Home';
import Mode from './views/Mode';
import ModeSelection from './views/ModeSelection';
import * as STATES from './stateMachine/stateNames';

const mapStateToProps = (state) => ({
  currentMode: state.machine.value && state.machine.value.currentMode,
});

const renderView = (currentMode) => {
  switch (currentMode) {
    case STATES.HOME:
      return <Home/>;
    case STATES.MODE_SELECTION:
      return <ModeSelection/>;
    case STATES.HISTORY_PREVIEW:
    case STATES.STEP_MODE: // TODO: change stepModeStates and batchModeStates to have nested states
    case STATES.BATCH_MODE:
      return <Mode/>;
    default:
      return <Home/>;
  }
}

const App = ({ currentMode }) => {
  return (
    <>
      { renderView(currentMode) }
    </>
  );
}

export default connect(mapStateToProps)(App);
