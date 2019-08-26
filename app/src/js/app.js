import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useMachine } from '@xstate/react';
import { Layout } from 'antd';

import { Home } from './views/Home';
import { BatchMode } from './views/BatchMode';
import { StepMode } from './views/StepMode';
import { HistoryMode } from './views/HistoryMode';
import { SideMenu } from './components/SideMenu';
import { modeMachine } from './stateMachine/modeMachine';
import { ModeMachineContext } from './helpers/modeMachineContext';
import { MODE_STATES } from './stateMachine/stateNames';
import { flushBatchModeState } from './actions/batchModeActions';
import { flushStepModeState } from './actions/stepModeActions';

const { Content } = Layout;

const AppWrapper = styled(Layout)`
  height: 100vh;
  width: 100vw;
  color: rgba(0, 0, 0, 0.85);
`;

const FullHeightLayout = styled(Layout)`
  height: 100%;
`;

const FullHeightContent = styled(Content)`
  height: 100%;
`

const App = () => {
  const dispatch = useDispatch();
  const [currentModeState, transitionMode] = useMachine(modeMachine, {
    actions: {
      /* This will cause the state to be flushed if we move to history mode unless history mode is moved to step mode */
      flushStepModeState: () => dispatch(flushStepModeState()),
      flushBatchModeState: () => dispatch(flushBatchModeState()),
    },
  });

  const renderView = () => {
    switch (true) {
      case currentModeState.matches(MODE_STATES.HOME):
        return <Home/>;
      case currentModeState.matches(MODE_STATES.HISTORY_MODE):
        return <HistoryMode/>;
      case currentModeState.matches(MODE_STATES.STEP_MODE):
        return <StepMode/>;
      case currentModeState.matches(MODE_STATES.BATCH_MODE): {
        return <BatchMode/>;
      }
      default:
        return <div>Undefined state</div>;
    }
  }
  return (
    <ModeMachineContext.Provider value={{ currentModeState, transitionMode }}>
      <AppWrapper>
        {
          !currentModeState.matches(MODE_STATES.HOME) &&
          <SideMenu/>
        }
        <FullHeightLayout>
          <FullHeightContent>
            { renderView() }
          </FullHeightContent>
        </FullHeightLayout>
      </AppWrapper>
    </ModeMachineContext.Provider>
  );
}

export default App;
