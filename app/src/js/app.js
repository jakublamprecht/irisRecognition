import React, { useState } from 'react';
import { useMachine } from '@xstate/react';
import { Layout } from 'antd';
import styled from 'styled-components';

import Home from './views/Home';
import { SideMenu } from './components/SideMenu';
import { modeMachine } from './stateMachine/modeMachine';
import * as STATES from './stateMachine/stateNames';

const { Sider, Content } = Layout;

const AppWrapper = styled(Layout)`
  height: 100vh;
  width: 100vw;
  color: rgba(0, 0, 0, 0.85);
`;

const App = () => {
  const [isMenuCollapsed, setMenuCollapsed] = useState(true);
  const [currentAutomataState, transition, modeAutomataService] = useMachine(modeMachine);

  const onCollapse = (isCollapsed) => { setMenuCollapsed(isCollapsed); };

  const renderView = () => {
    switch (currentAutomataState.value) {
      case STATES.HOME:
        return <Home/>;
      case STATES.HISTORY_MODE:
        return <div>History</div>
      case STATES.STEP_MODE:
        return <div>Step</div>;
      case STATES.BATCH_MODE:
        return <div>Batch</div>;
      default:
        return <div>Undefined state</div>;
    }
  }
  return (
    <AppWrapper>
      <Sider
        collapsible
        collapsed={isMenuCollapsed}
        onCollapse={onCollapse}>
        <SideMenu modeAutomataService={modeAutomataService}/>
      </Sider>
      <Layout>
        <Content>
          { renderView() }
        </Content>
      </Layout>
    </AppWrapper>
  );
}

export default App;
