import React from 'react';
import { Menu, Icon } from 'antd';
import { ModeMachineContext } from '../../helpers/modeMachineContext';
import * as TRANSITIONS from '../../stateMachine/transitions';
import * as STATES from '../../stateMachine/stateNames';

export const SideMenu = () => (
  <ModeMachineContext.Consumer>
    {({ currentModeState, transitionMode }) => (
      <Menu
        theme='dark'
        mode='inline'
        defaultSelectedKeys={[STATES.HOME]}
        selectedKeys={[currentModeState.value]}>
        <Menu.Item
          key={STATES.HOME}
          onClick={() => { transitionMode(TRANSITIONS.RETURN_HOME) }}>
          <Icon type='home' theme='filled'/>
          <span>Home</span>
        </Menu.Item>
        <Menu.Item
          key={STATES.STEP_MODE}
          onClick={() => { transitionMode(TRANSITIONS.STEP_MODE_SELECTED) }}>
          <Icon type='build' theme='filled'/>
          <span>Step mode</span>
        </Menu.Item>
        <Menu.Item
          key={STATES.BATCH_MODE}
          onClick={() => { transitionMode(TRANSITIONS.BATCH_MODE_SELECTED) }}>
          <Icon type='thunderbolt' theme='filled'/>
          <span>Batch mode</span>
        </Menu.Item>
        <Menu.Item
          key={STATES.HISTORY_MODE}
          onClick={() => { transitionMode(TRANSITIONS.HISTORY_MODE_SELECTED) }}>
          <Icon type='file-image'/>
          <span>History</span>
        </Menu.Item>
      </Menu>
    )}
  </ModeMachineContext.Consumer>
);
