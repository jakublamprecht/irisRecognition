import React from 'react';
import { useMachine } from '@xstate/react';
import { modeMachine } from '../stateMachine/modeMachine';

const [currentModeState, transitionMode] = useMachine(modeMachine);

export const ModeMachineContext = React.createContext({
  currentModeState,
  transitionMode,
});
