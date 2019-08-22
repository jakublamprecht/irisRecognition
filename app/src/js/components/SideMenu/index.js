import React, { useContext } from 'react';
import { Menu, Icon } from 'antd';
import { ModeMachineContext } from '../../helpers/modeMachineContext';
import { MODE_STATES } from '../../stateMachine/stateNames';
import { MODE_TRANSITIONS } from '../../stateMachine/transitions';

export const SideMenu = () => {
  const { currentModeState, transitionMode } = useContext(ModeMachineContext);
  const currentMode = currentModeState.toStrings()[0];

  return (
    <Menu
      theme='dark'
      mode='inline'
      defaultSelectedKeys={[MODE_STATES.HOME]}
      selectedKeys={[currentMode]}>
      <Menu.Item
        key={MODE_STATES.HOME}
        onClick={() => { transitionMode(MODE_TRANSITIONS.RETURN_HOME) }}>
        <Icon type='home' theme='filled'/>
        <span>Home</span>
      </Menu.Item>
      <Menu.Item
        key={MODE_STATES.BATCH_MODE}
        onClick={() => { transitionMode(MODE_TRANSITIONS.BATCH_MODE_SELECTED) }}>
        <Icon type='thunderbolt' theme='filled'/>
        <span>Batch mode</span>
      </Menu.Item>
      <Menu.Item
        key={MODE_STATES.STEP_MODE}
        onClick={() => { transitionMode(MODE_TRANSITIONS.STEP_MODE_SELECTED) }}>
        <Icon type='build' theme='filled'/>
        <span>Step mode</span>
      </Menu.Item>
      {
        (currentModeState.matches(MODE_STATES.STEP_MODE) ||
        currentModeState.matches(MODE_STATES.HISTORY_MODE)) &&
        <Menu.Item
          key={MODE_STATES.HISTORY_MODE}
          onClick={() => { transitionMode(MODE_TRANSITIONS.HISTORY_MODE_SELECTED) }}>
          <Icon type='file-image'/>
          <span>History</span>
        </Menu.Item>
      }
    </Menu>
  );
};
