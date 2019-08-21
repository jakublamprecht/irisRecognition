import React from 'react';
import { useService } from '@xstate/react';
import { Menu, Icon } from 'antd';
import * as TRANSITIONS from '../../stateMachine/transitions';
import * as STATES from '../../stateMachine/stateNames';

export const SideMenu = ({ modeAutomataService }) => {
  const [currentAutomataState, transition] = useService(modeAutomataService);

  return (
    <Menu theme='dark' defaultSelectedKeys={['home']} mode='inline'>
      <Menu.Item
        key='home'
        onClick={() => { transition(TRANSITIONS.RETURN_HOME) }}>
        <Icon type='home' theme='filled'/>
        <span>Home</span>
      </Menu.Item>
      <Menu.Item
        key='step'
        onClick={() => { transition(TRANSITIONS.STEP_MODE_SELECTED) }}>
        <Icon type='build' theme='filled'/>
        <span>Step mode</span>
      </Menu.Item>
      <Menu.Item
        key='batch'
        onClick={() => { transition(TRANSITIONS.BATCH_MODE_SELECTED) }}>
        <Icon type='thunderbolt' theme='filled'/>
        <span>Batch mode</span>
      </Menu.Item>
      {
        currentAutomataState.value !== STATES.HOME &&
        <Menu.Item
          key='history'
          onClick={() => { transition(TRANSITIONS.HISTORY_MODE_SELECTED) }}>
          <Icon type='file-image'/>
          <span>History</span>
        </Menu.Item>
      }
    </Menu>
  );
}
