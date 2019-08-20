import React from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Icon } from 'antd';
import { modes } from '../conf/modes.conf';
import * as STATES from '../stateMachine/stateNames';
import { returnHome } from '../actions/transitionActions';
import StepModeWizard from './StepModeWizard';
import BatchModeWizard from './BatchModeWizard';

const { Content, Sider } = Layout;

const mapStateToProps = (state) => ({
  currentState: state.machine.value && state.machine.value.currentMode,
});

const renderCurrentModeView = (currentState) => {
  switch (currentState) {
    case STATES.STEP_MODE:
      return <StepModeWizard/>
    case STATES.BATCH_MODE:
      return <BatchModeWizard/>
    default:
      return 'Oops';
  }
}

const Mode = ({ currentState, meta, dispatch }) => (
  <Layout className="mode app-view">
    <Sider>
      { console.log(meta) }
      <Menu theme="dark" mode="inline">
        <Menu.Item key="home" onClick={ () => { dispatch(returnHome()) } }>
          <Icon type="home" theme="filled"/>
          <span className="nav-text">Home</span>
        </Menu.Item>
        {
          Object.values(modes).map((mode) => (
            <Menu.Item key={mode.name} onClick={ () => { dispatch(mode.transitionAction) } }>
              <Icon type={mode.icon} theme="filled"/>
              <span className="nav-text">{mode.name}</span>
            </Menu.Item>
          ))
        }
      </Menu>
    </Sider>
    <Layout>
      <Content className="mode-content">
        { renderCurrentModeView(currentState) }
      </Content>
    </Layout>
  </Layout>
);

export default connect(mapStateToProps)(Mode);
