import React, { useState } from 'react';
import { useMachine } from '@xstate/react';
import { Layout } from 'antd';
import styled from 'styled-components';

import { Home } from './views/Home';
import { BatchMode } from './views/BatchMode';
import { StepMode } from './views/StepMode';
import { HistoryMode } from './views/HistoryMode';
import { SideMenu } from './components/SideMenu';
import { modeMachine } from './stateMachine/modeMachine';
import { ModeMachineContext } from './helpers/modeMachineContext';
import { MODE_STATES } from './stateMachine/stateNames';

const { Sider, Content } = Layout;

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
  const [isMenuCollapsed, setMenuCollapsed] = useState(true);
  const [currentModeState, transitionMode] = useMachine(modeMachine);

  const onCollapse = (isCollapsed) => { setMenuCollapsed(isCollapsed); };

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
          <Sider
            collapsible
            collapsed={isMenuCollapsed}
            onCollapse={onCollapse}>
            <SideMenu/>
          </Sider>
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
